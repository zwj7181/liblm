use crate::utils::{dot_env_to_map, START_CMD};
use lm_fe_rust::{
    my_err_msg, run_command_spawn_envs,
    utils::{MyResult},
};


pub async fn do_start() -> MyResult<()> {

    let mut env_m = dot_env_to_map().await?;

    env_m.insert("ENVIRONMENT_MODE".to_string(), "development".to_string());

    
    println!("开始运行: {:?}", env_m);

    let mut start_task = run_command_spawn_envs(
        START_CMD,
        // "dir",
        env_m.iter().map(|a| (a.0.as_str(), a.1.as_str())),
    )
    .await?;



    if !start_task.wait().await?.success() {
        return my_err_msg!(;"启动失败！");
    }
 

    Ok(())
}


