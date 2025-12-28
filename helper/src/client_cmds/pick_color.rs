use colored::Colorize;
use lm_fe_rust::utils::MyResult;
use windows::Win32::{
    Foundation::*,
    Graphics::Gdi::{GetDC, GetPixel, ReleaseDC, HDC},
    System::{
        DataExchange::{CloseClipboard, EmptyClipboard, OpenClipboard, SetClipboardData},
        Memory::{GlobalAlloc, GlobalLock, GlobalUnlock, GMEM_MOVEABLE},
        Ole::CF_UNICODETEXT,
    },
    UI::{
        Input::KeyboardAndMouse::{GetAsyncKeyState, VK_C, VK_CONTROL, VK_P, VK_SHIFT, VK_Z},
        WindowsAndMessaging::*,
    },
};

macro_rules! Empty_HWND {
    () => {
        Some(HWND(std::ptr::null_mut()))
    };
}

pub fn pick_color() -> MyResult<()> {
    println!("请按 Ctrl + Shift + Z 取颜色!");

    loop {
        // 检测 Ctrl+Shift+Z 组合键
        let ctrl_pressed = is_key_pressed(VK_CONTROL.0 as i32);
        let shift_pressed = is_key_pressed(VK_SHIFT.0 as i32);
        let z_pressed = is_key_pressed(VK_Z.0 as i32);
        let c_pressed = is_key_pressed(VK_C.0 as i32);

        if ctrl_pressed && c_pressed {
            println!("退出取色!");
            break;
        }
        if ctrl_pressed && shift_pressed && z_pressed {
            let (x, y) = get_cursor_pos();
            let (r, g, b) = get_pixel_color(x, y);
            let color_text = format!("rgb({}, {}, {})", r, g, b);
            let color_text2 = format!("#{:02X}{:02X}{:02X}", r, g, b);
            let text: String = format!("颜色为：{} {}, 已复制到剪切板", color_text.truecolor(r, g, b),color_text2.on_custom_color((r, g, b)));
            copy_to_clipboard(&color_text).unwrap();
            println!("{}", text);
            std::thread::sleep(std::time::Duration::from_secs(1));
        }
    }
    Ok(())
}

// 辅助函数：检测按键状态
fn is_key_pressed(vk_code: i32) -> bool {
    unsafe { GetAsyncKeyState(vk_code) & 0x8000u16 as i16 != 0 }
}

// 辅助函数：获取鼠标位置
fn get_cursor_pos() -> (i32, i32) {
    unsafe {
        let mut point = POINT { x: 0, y: 0 };
        GetCursorPos(&mut point).unwrap();
        (point.x, point.y)
    }
}
fn get_screen_dc() -> HDC {
    unsafe { GetDC(Some(HWND(std::ptr::null_mut()))) } // 获取整个屏幕的 DC
}
fn get_pixel_color(x: i32, y: i32) -> (u8, u8, u8) {
    unsafe {
        let hdc = get_screen_dc();
        let color = GetPixel(hdc, x, y);
        ReleaseDC(Some(HWND(std::ptr::null_mut())), hdc);

        // 解析颜色（注意 Windows 的 BGR 格式）
        let color_value = color.0 & 0x00FFFFFF;
        let r = (color_value & 0xFF) as u8;
        let g = ((color_value >> 8) & 0xFF) as u8;
        let b = ((color_value >> 16) & 0xFF) as u8;
        (r, g, b)
    }
}

fn copy_to_clipboard(text: &str) -> Result<(), WIN32_ERROR> {
    unsafe {
        // 将 Rust 字符串转换为 UTF-16（宽字符）格式
        let mut buffer: Vec<u16> = text.encode_utf16().collect();
        buffer.push(0); // 添加 null 终止符

        // 计算需要的字节大小（每个 u16 占 2 字节）
        let size = buffer.len() * std::mem::size_of::<u16>();

        // 分配全局内存
        let h_global = GlobalAlloc(GMEM_MOVEABLE, size).unwrap();
        if h_global.is_invalid() {
            return Err(GetLastError().into());
        }

        // 锁定内存获取指针
        let ptr = GlobalLock(h_global) as *mut u16;
        if ptr.is_null() {
            GlobalFree(Some(h_global)).unwrap();
            return Err(GetLastError().into());
        }

        // 复制数据到内存
        std::ptr::copy_nonoverlapping(buffer.as_ptr(), ptr, buffer.len());

        // 解锁内存
        if GlobalUnlock(h_global).is_err() && GetLastError().0 != 0 {
            GlobalFree(Some(h_global)).unwrap();
            return Err(GetLastError().into());
        }

        // 打开剪贴板
        if OpenClipboard(Empty_HWND!()).is_err() {
            GlobalFree(Some(h_global)).unwrap();
            return Err(GetLastError().into());
        }

        // 清空剪贴板
        if EmptyClipboard().is_err() {
            CloseClipboard().unwrap(); // 关闭剪贴板
            GlobalFree(Some(h_global)).unwrap(); // 释放内存
            return Err(GetLastError().into());
        }

        // 设置剪贴板数据
        if SetClipboardData(
            CF_UNICODETEXT.0.into(),
            Some(windows::Win32::Foundation::HANDLE(h_global.0)),
        )
        .unwrap()
        .is_invalid()
        {
            CloseClipboard().unwrap();
            GlobalFree(Some(h_global)).unwrap();
            return Err(GetLastError().into());
        }

        // 关闭剪贴板（此时系统接管内存）
        CloseClipboard().unwrap();

        Ok(())
    }
}
