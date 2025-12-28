import { SMchc_Common } from '@lm_fe/service';

export function checkLogin() {
    checkLogin_Inner()
}
let failedCount = 0;
let checkLogin_Inner = () => {
    SMchc_Common.checkLogin()
        .then((isNew) => {
            if (isNew) {
            }
        })
        .catch((e) => {
            if (++failedCount > 0) {
                checkLogin_Inner = () => { }
            }
        })

}
