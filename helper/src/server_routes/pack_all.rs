
use axum::{
    http::StatusCode,
    Json,
};
use lm_fe_rust::{
    my_message::{json_msg, MyMessage},
    run_command,
};


// basic handler that responds with a static string
pub async fn pack_all() -> (StatusCode, Json<MyMessage<()>>) {
    let script = "./compress_packages.sh".to_string();
    println!("构建请求 {script}");
    let res = run_command(&script).await;
    match res {
        Ok(s) => {
            println!("构建结果 {s}");

            if s.contains("success") {
                (StatusCode::OK, json_msg(&s))
            } else {
                println!("构建失败 {s}");

                (StatusCode::INTERNAL_SERVER_ERROR, json_msg("构建出错"))
            }
        }
        Err(e) => {
            println!("命令执行失败 {}", e);

            (StatusCode::INTERNAL_SERVER_ERROR, json_msg(&e.to_string()))
        }
    }
}
