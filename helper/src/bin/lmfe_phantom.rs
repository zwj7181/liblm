use anyhow::Result;
use scraper::{Html, Selector};
use std::fs;
use std::path::Path;

#[tokio::main]
async fn main() -> Result<()> {
    // 创建 js 目录（如果不存在）
    if !Path::new("js").exists() {
        fs::create_dir("js")?;
    }

    // 生成 js 文件内容
    let js_content = r#"function get_key() {
    // 这里添加您的计算逻辑
    var timestamp = new Date().getTime();
    var random = Math.random();
    return timestamp + '_' + random;
}"#;

    // 写入 js 文件
    fs::write("js/key.js", js_content)?;

    // 读取 HTML 文件
    let html_content = fs::read_to_string("test.html")?;
    let document = Html::parse_document(&html_content);
    
    // 创建 script 引用标签
    let script_content = r#"<script src="js/key.js"></script>"#;
    
    // 选择 body 标签
    let body_selector = Selector::parse("body").unwrap();
    if let Some(body) = document.select(&body_selector).next() {
        // 获取原始的 HTML
        let mut html_content = html_content;
        
        // 在 </body> 之前插入 script
        html_content = html_content.replace("</body>", &format!("{}\n</body>", script_content));
        
        // 写回文件
        fs::write("out1.html", html_content)?;
    }
    
    Ok(())
}
