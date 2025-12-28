use std::error::Error;

use anyhow::Result;
#[cfg(windows)]
pub const BUILD_CMD: &str =
    r" node .\node_modules\webpack\bin\webpack.js --config webpack.prod.config.js";
#[cfg(not(windows))]
pub const BUILD_CMD: &str =
    r" node ./node_modules/webpack/bin/webpack.js --config webpack.prod.config.js";

#[cfg(windows)]
pub const START_CMD: &str =
    r" node .\node_modules\webpack\bin\webpack.js serve --open --config webpack.dev.config.js";
#[cfg(not(windows))]
pub const START_CMD: &str =
    r" node ./node_modules/webpack/bin/webpack.js serve --open --config webpack.dev.config.js";

pub type DynErr<T> = Result<T, Box<dyn Error>>;

pub const CLIENT_EXE_NAME: &str = "lmfe_client";

pub const SERVER_PORT: u16 = 7701;
pub const HELPER_PORT: u16 = 7702;

pub const PKG_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg(debug_assertions)]
pub const SERVER_HOST: &str = "http://127.0.0.1:7701";
#[cfg(not(debug_assertions))]
pub const SERVER_HOST: &str = "http://192.168.124.53:7701";

#[cfg(debug_assertions)]
pub const SERVE_PACK: &str = "serve_pack";
#[cfg(not(debug_assertions))]
pub const SERVE_PACK: &str = "serve_pack";
