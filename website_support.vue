<template>
    <div class="page_container" > <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40" id="contact_us_container">
            <div class="row"> 
                <div class="col-sm-8 contact_contents">
                    <h1 class="text-left">
                        Website Support
                    </h1>
                    <div class="description_text text_left">
                        We value your feedback. Send us your comments or questions by completing the contact form below.
                    </div>
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
                <div class="col-sm-4 text-left" v-if="currentPage">
                    <div class="page_header all_caps double_border_bottom">
            			<div class=" text_left"> CENTRE INFORMATION</div>
            		</div>
            		<!--<div class="property_address">-->
            		<!--     {{property.address1}} <br/> {{property.city}} <br/> {{property.province}} {{property.postal_code}} -->
            		<!--</div>-->
                    <div class="text-left" v-html="currentPage.body"></div>
                </div> 
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    #contact_us_container .row{
        margin-left:inherit;
    }
    #contact_us_container {
        margin: 20px auto 0;
    }
    #contact_us_container .page_header {
        margin-bottom:20px;
    }
    #contact_us_container .property_address {
        margin-bottom:20px;
    }
    .form-group .form-control-feedback{
        font-size: 12px;
        /*top:60px;*/
        color: #F44336;
        top: initial;
        bottom: -20px;
    }
    @media (max-width: 768px) { 
        .col-sm-6.col-xs-12{
            padding-top: 20px;
        }
    }
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', 'utility'], function(Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate,Utility) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("website -support-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    form_data : {},
                    formSuccess : false,
                    formError: false,
                    validaNum: '',
                    correctValNum: null,
                    validNumError: false,
                    currentPage : null,
                    sideImage: null
                }
            },
            created(){
                this.loadData().then(response => {
                    this.dataloaded = true;
                    if(response && response[0].data){
                        this.currentPage = response[0].data;
                    }
                    var temp_repo = this.findRepoByName('Contact Side Image');
                    if(temp_repo && temp_repo.images) {
                        this.sideImage = temp_repo.images[0];
                    } else {
                        this.sideImage = {};
                        this.sideImage.image_url = "";
                    }
                });
            },
            mounted () {
                //creating random validation num 
                this.correctValNum = Utility.rannumber();//this.rannumber;
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
                    'timezone',
                    'findRepoByName'
                ]),
            },
            methods: {
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            let errors = this.errors;
                            // send_data = {};
                            // send_data.form_data = JSON.stringify(Utility.serializeObject(this.form_data));
                            // this.$store.dispatch("POST_TO_MM", send_data).then(res => {
                            //     this.formSuccess = true;
                            // }).catch(error => {
                            //     try {
                            //         if (error.response.status == 401) {
                            //             console.log("Data load error: " + error.message);
                            //             this.formError = true;
                            //         } 
                            //         else {
                            //             console.log("Data load error: " + error.message);
                            //             this.formError = true;
                            //         }
                            //     } 
                            //     catch (e) {
                            //         console.log("Data load error: " + error.message);
                            //         this.formError = true;
                            //     }
                            // })
                            let send_data = new FormData()
                            send_data.append('mailto', 'sankavy@mobilefringe.com')
                            send_data.append('from_email', this.form_data.email)
                            send_data.append('subject', this.property.name + ' Contact Form')
                            send_data.append('custom[Name]', this.form_data.name)
                            send_data.append('custom[Email]', this.form_data.email)
                            send_data.append('custom[Message]', this.form_data.message)
                            
                            let vm = this
                            fetch('https://www.mallmaverick.com/custom_email.js', {
                            method: 'post',
                                body: send_data
                            })
                            .then(result => {
                                this.formSuccess = true
                            })
                            .catch(error => {
                                this.formError = true
                            })
                        }
                    })
                },
                loadData: async function() {
                    try {
                        host_name = this.property.mm_host.replace("http:", "");
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: host_name + "/pages/"+this.$root.site+"-contact-us.json"}), this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>
