use std::path::Path;

use anyhow::Result;
use helper::{
    client_cmds::client_serve_cmds,
    utils::{move_exe_to_vscode_dir, update_self, TransMsg, PKG_VERSION},
};
use tokio::sync::mpsc::{self};

#[tokio::main]
async fn main() -> Result<()> {
    move_exe_to_vscode_dir().await;
    let (tx, mut rx) = mpsc::channel::<TransMsg>(1024);
    let h1 = tokio::spawn(async move {
        update_self(tx).await.expect("update_self");
    });
    let h2 = tokio::spawn(async { client_serve_cmds().await.expect("命令执行") });

    h1.await.expect("updaet spawn wait");
    h2.await.expect("cli spawn wait");
    let ret = rx.recv().await;

    if let Some(msg) = ret {
        match msg.new_exe_path {
            Some(p) => {
                println!(
                    "v{} 准备升级到 v{}!",
                    PKG_VERSION,
                    msg.new_v.unwrap()
                );
                let new_binary = Path::new(&p);
                self_replace::self_replace(new_binary)?;
                std::fs::remove_file(new_binary)?;
            }
            None => println!("v{PKG_VERSION} 没有可用的更新!"),
        }
    }
    Ok(())
}
