use std::env;
use std::path::Path;

fn main() {
    let profile = env::var("PROFILE").unwrap();
    let profile_dir = format!("target/{}", profile);
    let version_file = Path::new(&profile_dir).join("version.txt");

    // Tell Cargo that if the given file changes, to rerun this build script.
    println!("cargo::rerun-if-changed=Cargo.toml");
    // 获取项目版本号
    let version = env!("CARGO_PKG_VERSION");
    // let bin_name = std::env::var("CARGO_BIN_NAME").unwrap_or("dd123".to_string());

    std::fs::write(version_file, version).expect("write version file");

    // println!("cargo::warning=version= ++++++++++++++======{version}, bin={bin_name} profile_dir={profile_dir}")
}
