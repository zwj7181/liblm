use std::path::Path;

use clap::Args;
use fs_extra::dir::CopyOptions;
use lm_fe_rust::{my_helper::decompress_gz, utils::MyResult};
use tokio::{
    fs::{self, File},
    io::AsyncWriteExt,
    time::Instant,
};

use crate::{
    client_cmds::fresh::do_fresh,
    utils::{get_serve_pack_url, get_server_url},
};
#[derive(Args, Clone, Debug)]
pub struct InstallArgs {
    /// 包名：utils、env、service、components、components_m、pages-mchc、pages-fubao、core
    pub name: Option<String>,
}
pub const INSTALL_ARGS: [&str; 9] = [
    "all",
    "utils",
    "env",
    "service",
    "components",
    "components_m",
    "pages-mchc",
    "pages-fubao",
    "core",
];
pub async fn do_install(args: &InstallArgs) -> MyResult<()> {
    if let Some(name) = &args.name {
        return do_fresh(name).await;
    }
    let node_module_dir = Path::new("node_modules/@lm_fe");

    if !node_module_dir.exists() {
        fs::create_dir_all(&node_module_dir)
            .await
            .expect("创建node_modules失败");
    }

    let source = get_serve_pack_url("all.tar.gz");
    let geturl = get_server_url(&source);
    let pack_url = get_server_url("/pack_all");
    println!("开始获取, 请稍等片刻...");
    let start = Instant::now();
    let r = reqwest::get(pack_url).await.expect("构建请求");
    let code = r.status();
    if code.is_success() {
        println!("开始安装");
        let resp = reqwest::get(geturl.clone()).await.expect("资源请求");

        let mut file = File::create("tmp.tar.gz").await.expect("创建文件失败");
        let stream = resp.bytes().await.expect("resp bytes");
        file.write_all(&stream).await.expect("write all ");

        decompress_gz("tmp.tar.gz", node_module_dir).await;

        // let mut s =
        //     run_command_spawn(r"xcopy.exe .\node_modules\@lm_fe\static\asserts\* public /S /D /I")
        //         .await
        //         .expect("copy");
        // s.wait().await.expect("wait");
        copy_the_fucking_things().expect("copy");
        println!("操作成功，耗时 {:?}", start.elapsed());
    } else {
        println!("构建出错 {}", r.text().await.expect("msg"))
    }
    Ok(())
}
fn copy_the_fucking_things() -> fs_extra::error::Result<()> {
    let target = "dist".to_string();
    let mut options = fs_extra::dir::CopyOptions::new();
    options.skip_exist = true;
    options.copy_inside = true;
    options.content_only = true;
    // let from_paths = vec![
    //     "public/img"
    // ];
    // fs_extra::copy_items(&from_paths, target, &options)?;
    fs_extra::dir::copy("./node_modules/@lm_fe/static/asserts/", "public", &options)?;
    Ok(())
}
fn append_files_from_dir1_to_dir2() -> fs_extra::error::Result<()> {
    let from_paths = vec!["./node_modules/@lm_fe/static/asserts"];
    let target = "public";
    let mut options = CopyOptions::new();
    options.overwrite = true;
    options.copy_inside = true;
    fs_extra::copy_items(&from_paths, target, &options)?;
    Ok(())
}
