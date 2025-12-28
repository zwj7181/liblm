use std::path::Path;

use anyhow::{Context, Result};
use tokio::{fs};

pub struct CheckVersion<'a> {
    pub n: u32,
    pub path: &'a Path,
}

impl<'a> CheckVersion<'a> {
    pub async fn from_file<T: AsRef<Path> + ?Sized>(file: &'a T) -> Result<Self> {
        let file = file.as_ref();
        if !file.exists() {
            fs::write(file, "0").await?;
        }

        let f = fs::read_to_string(file).await.context("read version")?;
        let n = f.trim().parse::<u32>().context("parse version")?;
        Ok(Self { n, path: file })
    }
    pub async fn to_file<T: AsRef<Path> + ?Sized>(&self, target: &T) -> Result<()> {
        let target  = target.as_ref();
        fs::write(self.path, self.n.to_string())
            .await
            .context("read version")?;
        if !target.exists() {
            fs::create_dir_all(target).await?;
        }
        fs::write(target.join(self.path), self.n.to_string())
            .await
            .context("read version")?;

        Ok(())
    }
    pub fn next(&mut self) -> u32 {
        self.n += 1;
        self.n
    }
}

#[cfg(test)]
mod test {
    use super::*;
    #[tokio::test]
    async fn t() {
        let a = &mut CheckVersion::from_file("check_verion")
            .await
            .expect("from file");

        a.next();
        a.to_file("distb/gg").await.unwrap();
    }
}
