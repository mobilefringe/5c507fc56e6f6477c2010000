<template>
    <div id="pages_container" v-if="currentPage">
        <div class="page_header all_caps double_border_bottom">
			<div class="page_container text_left" v-html="currentPage.title"> </div>
		</div>
        <div class="page_container">
            <div class="row padding_tb_30" >
                <img src="//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548064342000/InsidePageImages_940x320px_SpecialtyLeasingPage.jpg" class="" alt="">
                <div class="page_body description_text text_left padding_tb_30" v-html="currentPage.body"></div>
                <form class="form-horizontal padding_top_20" action="form-submit" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('name')}">
                                <label class="label" for="form_name">Name</label>
                                <input v-model="form_data.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="name" type="text" placeholder="Name" data-vv-delay="500" id="form_name">
                                <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
                            </div>
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
                                <label class="label" for="form_email">Email</label>
                                <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="500" id="form_email">
                                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}">
                                <label class="label" for="form_phone">Phone</label>
                                <input v-model="form_data.phone" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="phone" type="phone" placeholder="Phone" data-vv-delay="500" id="form_phone">
                                <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
                            </div>
                            <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('subject')}">
                                <label class="label" for="form_subject">Subject</label>
                                <input v-model="form_data.subject" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="subject" type="text" placeholder="Subject" data-vv-delay="500" id="form_subject">
                                <span v-show="errors.has('subject')" class="form-control-feedback">{{ errors.first('subject') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12" :class="{'has-error': errors.has('message')}">
                                <label class="label" for="form_message">Message</label>
                                <textarea v-model="form_data.message" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="message" type="text" placeholder="Message" data-vv-delay="500" id="form_message"></textarea>
                                <span v-show="errors.has('message')" class="form-control-feedback">{{ errors.first('message') }}</span>
                            </div>
                        </div>
                        <div class="form-group account-btn text-left m-t-10">
                            <div class="col-xs-12">
                                <button class="feature-readmore hvr-sweep-to-right" type="submit" :disabled="formSuccess">Submit</button>
                            </div>
                        </div>
                    </form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
            </div>
        </div>
        <div style="padding:20px 0;"></div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", 'vee-validate', 'utility'], function(Vue, Vuex, moment, tz, VueMoment, VeeValidate, Utility) {
        return Vue.component("leasing-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null,
                    form_data : {},
                    formSuccess : false,
                    formError: false,
                }
            },
            beforeRouteUpdate(to, from, next) {
                this.updateCurrentPage();
                next();
            },
            created(){
                this.updateCurrentPage();
                //ensuring the variables are created in this order for email
                this.form_data.name = null;
                this.form_data.email = null;
                this.form_data.phone = null;
                this.form_data.subject = null;
                this.form_data.message = null;
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone'
                ])
            },
            methods: {
                updateCurrentPage (id) {
                    host_name = this.property.mm_host.replace("http:", "");
                    this.$store.dispatch('LOAD_PAGE_DATA', {
                        url: host_name + "/pages/" + this.$root.site + "-leasing.json"
                    }).then(response => {
                        this.currentPage = response.data;
                    }, error => {
                        console.error("Could not retrieve data from server. Please check internet connection and try again.");
                        this.$router.replace({ path: '/'});
                    });
                },
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                    if (result) {
                        let errors = this.errors;
                        send_data = {};
                        send_data.form_data = JSON.stringify(Utility.serializeObject(this.form_data));
                        this.$store.dispatch("CONTACT_US", send_data).then(res => {
                            this.formSuccess = true;
                        }).catch(error => {
                            try {
                                if (error.response.status == 401) {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                } 
                                else {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                }
                            } 
                            catch (e) {
                                console.log("Data load error: " + error.message);
                                this.formError = true;
                            }
                        })
                        }
                    
                    })
                },
            }
        });
    });
</script>