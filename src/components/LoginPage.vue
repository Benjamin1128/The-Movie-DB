<template>
  <div class="login-container">
    <h2 class="text-h5 q-mb-md">Login to your account</h2>

    <p class="text-body2 q-mb-md">In order to use the editing and rating capabilities of 
        TMDB, as well as get personal recommendations you will 
        need to login to your account. If you do not have an 
        account, registering for an account is free and simple.
    
    <a href="https://themoviedb.org/signup" 
    class="hyperlinkText">Click here</a>
    to get started.
    </p>

    <p class="text-body2 q-mb-lg">
    If you signed up but didn't get your verification email,
    <a href="https://www.themoviedb.org/resend-email-verification"
    class="hyperlinkText">click here</a>
    to have it resent.
    </p>
  
    <div v-if="loginFailed" class="ifFailSection">
        <q-banner dense class="failure">
            <div class="row bg-red">
                <q-icon name="warning" size="2em" />
                <div class="failtitle">Account verification required</div>
            </div>
                <div class="failcontent">
                    <p>
                        Your email address hasn't been verified. 
                        Please click the verification link in the 
                        email that was sent to the address you signed 
                        up with. (Don't forget to check your spam folder.) 
                        You may 
                        <a href="https://www.themoviedb.org/resend-email-verification"
                        class="link">
                            request the email be sent 
                        </a>
                        if you are unable to locate your activation email.
                    </p>
                </div>
        </q-banner>
    </div>

    <q-form @submit.prevent="onSubmit" class="q-gutter-md q-mt-lg">
        <q-input
            filled
            v-model="username"
            label="Username"
            lazy-rules
        />

        <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
        />

        <div class="row btnClass">
            <q-btn label="Login" type="submit" class="btnLogin" no-caps />
            <a 
                href="https://www.themoviedb.org/reset-password"
                class="hyperlinkText">
            Reset password</a>
        </div>
    </q-form>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            username: "",
            password: "",
            loginFailed: false,
        };
    },
    methods: {
        ...mapActions("getRequestToken", ['fetchRequestToken']),
        ...mapActions("getSessionId", ['fetchSessionID']),
        ...mapActions("validateToken", ['validateRequestToken']),
        ...mapActions("getRqtTknV3", ['fetchRqtTknV3']),
        ...mapActions("userdata", [
            'setUserLogin',
            'setUsername',
            'setUserLogout',
            'setAccountId',
            'setAccessToken',
            'setSessionId',
            'clearSession',
        ]),
        ...mapActions("validateUser", ['validateUserInfo']),
        async onSubmit() {
            try {
                await this.fetchRqtTknV3();
                const rtv3 = this.getRqtTknV3;

                await this.validateUserInfo({
                    username: this.username,
                    password: this.password,
                    request_token: rtv3, 
                });

                if (this.getUserValidation.success === true) {
                    await this.fetchRequestToken();
                    const requestToken = this.getRequestToken;

                    await this.fetchSessionID(rtv3);
                    let isTokenValidated = false;
                    while (!isTokenValidated) {
                        try {
                            await this.validateRequestToken({
                                username: this.username,
                                password: this.password,
                                request_token: requestToken,
                            });
                            isTokenValidated = true;
                        } catch (err) {
                            await new Promise((resolve) => setTimeout(resolve, 3000));
                        }
                    }
                    const AccessTokenLogin = this.getValidationResult.access_token;
                    const AccountId = this.getValidationResult.account_id;
                    if (AccessTokenLogin) {
                        this.setUserLogin(true);
                        this.setUsername(this.username);
                        this.setUserLogout(false);
                        this.setAccessToken(AccessTokenLogin);
                        this.setAccountId(AccountId);
                        this.setSessionId(this.getSessionID);
                        this.$router.replace({
                            path: `/`,
                        });
                    }     
                } else {
                    this.setUserLogin(false);
                    this.setUsername("");
                    this.setAccessToken("");
                    this.setAccountId("");
                    this.setSessionId("");
                }
            } catch (err) {
                this.loginFailed  = true;
                this.password = "";
            }
        },
    },
    computed : {
        ...mapGetters("getRequestToken", ['getRequestToken']),
        ...mapGetters("getSessionId", ['getSessionID']),
        ...mapGetters("getRqtTknV3", ['getRqtTknV3']),
        ...mapGetters("validateToken", ['getValidationResult']),
        ...mapGetters("validateUser", ['getUserValidation']),
    },
    async created() {

    },
}
</script>

<style scoped>

.login-container {
    margin-top: 8%;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 2%;
}

.login-container h2 {
    font-weight: bold;
}

.login-container p {
    font-size: medium;
}

.btnLogin {
    background-color: #01B4E4;
    color: white;
    border-radius: 10px;
    font-size: medium;
    font-weight: bold;
    height: auto;
    width: auto; 
    
}

.btnLogin:hover {
    background-color: rgb(3, 37, 65);
}

.btnClass {
    align-items: center;
    gap: 20px;
}

.hyperlinkText {
    color: #01B4E4;
    font-size: medium;
}

.link {
    color: black;
    text-decoration: underline;
}

.ifFailureSection {
    padding: 2%;
}

.failure {
    padding: 0%;
    border: 1px solid #e6e4e4;
    border-radius: 8px;
}

.failtitle {
    font-size: large;
    padding-left: 2%;
    align-content: center;
}

.failcontent {
    padding: 2%;
    font-size: medium;
    margin-block: 2px;
    margin-inline: 2px;
}

.bg-red {
    background-color: #8e1a1a;
    color: white;
    min-height: 50px;
    align-content: center;
    padding-left: 2%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

</style>