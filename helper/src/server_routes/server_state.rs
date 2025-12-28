use std::time::Instant;

#[derive(Clone)]
pub struct ServerState {
    pub start: Instant,
}
impl Default for ServerState {
    fn default() -> Self {
        Self::new()
    }
}

impl ServerState {
    pub fn new() -> Self {
        Self {
            start: Instant::now(),
        }
    }
}
