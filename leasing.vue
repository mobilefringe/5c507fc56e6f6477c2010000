<template>
    <div id="pages_container" v-if="currentPage">
        <div class="page_header all_caps double_border_bottom">
			<div class="page_container text_left" v-html="currentPage.title"> </div>
		</div>
        <div class="page_container">
            <div class="row padding_tb_30" >
                <img src="//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548064342000/InsidePageImages_940x320px_SpecialtyLeasingPage.jpg" class="" alt="">
                <div class="page_body description_text text_left padding_tb_30" v-html="currentPage.body"></div>
                <form class="form-horizontal padding_top_20" action="form-submit" v-on:submit.prevent="validateBeforeSubmitPerm">
    				<div class="form-group ">
    					<div class="col-xs-12 margin_20" :class="{'has-error': errors.has('legalName')}">
    						<label for="legalName">Legal Name of Organization<span class="req_star"> *</span></label>
    						<input id="legalName" v-model="form_data.legalName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="legalName" type="text" data-vv-delay="500" data-vv-as="Legal Name of Organization">
    						<span v-show="errors.has('legalName')" class="form-control-feedback">{{ errors.first('legalName') }}</span>
    					</div>
    				</div>
    				<div class="form-group">
    					<div class="col-sm-6 col-xs-12 margin_20" :class="{'has-error': errors.has('firstName')}">
    					    <label for="firstName">Contact First Name<span class="req_star"> *</span></label>
    						<input id="firstName" v-model="form_data.firstName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="firstName" type="text" data-vv-delay="500" data-vv-as="First Name">
    						<span v-show="errors.has('firstName')" class="form-control-feedback">{{ errors.first('firstName') }}</span>
    					</div>
    					<div class="col-sm-6 col-xs-12 margin_20" :class="{'has-error': errors.has('lastName')}">
    					    <label for="lastName">Contact Last Name<span class="req_star"> *</span></label>
    						<input id="lastName" v-model="form_data.lastName" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="lastName" type="text" data-vv-delay="500" data-vv-as="Last Name">
    						<span v-show="errors.has('lastName')" class="form-control-feedback">{{ errors.first('legalName') }}</span>
    					</div>
    				</div>
    				<div class="form-group">
    				    <div class="col-sm-6 col-xs-12 margin_20" :class="{'has-error': errors.has('phone')}">
    						<label for="phone">Contact Phone Number<span class="req_star"> *</span></label>
    						<input id="phone" v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" data-vv-delay="500" data-vv-as="Phone Number">
    						<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
    					</div>
    					<div class="col-sm-6 col-xs-12 margin_20" :class="{'has-error': errors.has('email')}">
    						<label for="email">Contact Email Address<span class="req_star"> *</span></label>
    						<input id="email" v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" data-vv-delay="500" data-vv-as="Email Address">
    						<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
    					</div>
    				</div>
    				<div class="form-group">
    				    <div class="col-xs-12 margin_20">
    						<label for="size">Square Footage Required</label>
    						<select id="size" v-model="form_data.size" class="form-control">
                                <option value="">Select square footage</option>
                                <option value="Less than 500 sq.ft.">Less than 500 sq.ft.</option>
                                <option value="500 - 1000 sq. ft.">500 - 1000 sq. ft.</option>
                                <option value="1000 - 2500 sq. ft.">1000 - 2500 sq. ft. </option>
                                <option value="More than 2500 sq. ft.">More than 2500 sq. ft.</option>
                            </select>
    					</div>
    				</div>
    				<div class="form-group">
    				    <div class="col-xs-12 margin_20">
    						<label for="comments">Comments</label>
    						<textarea id="comments" class="form-control" v-model="form_data.comments"></textarea>
    					</div>
    				</div>
    				<div class="form-group">
    					<div class="col-xs-12">
    						<button class="animated_btn" type="submit" :disabled="formSuccessPerm">
    						    Submit <i class="fa fa-angle-right" aria-hidden="true"></i>
    					    </button>
    					</div>
    				</div>
    			</form>
    			<div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccessPerm">
    				<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
    				<span class="sr-only">Success</span>
    				Thank you! A member from our Permanent Leasing Team will contact you shortly.
    			</div>
    			<div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formErrorPerm">
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
        Vue.use(VeeValidate);
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
                validateBeforeSubmitPerm() {
                    this.$validator.validate().then((result) => {
                        console.log(result)
                        if (result) {
                            let errors = this.errors;
                            //format email
                            send_data = {};
                            send_data.url = "https://www.mallmaverick.com/send_contact_email";
                            var perm_formdata = {}; //JSON.stringify(this.serializeObject(this.form_data));
                            perm_formdata.send_to = "eastwoodr@davpart.com";
                            perm_formdata.subject = "Gerrard Square Permanent Leasing Form"; 
                            perm_formdata.body = {};
                            perm_formdata.body["Legal Name of Organization"] =  this.form_data.legalName;
                             
                            perm_formdata.body["Contact First Name"] =   this.form_data.firstName, 
                            perm_formdata.body["Contact Last Name"] = this.form_data.lastName,
                            perm_formdata.body["Contact Phone Number"] = this.form_data.phone, 
                            perm_formdata.body["Contact Email Address" ] =  this.form_data.email, 
                            perm_formdata.body["Square Footage Required"] =  this.form_data.size, 
                            perm_formdata.body["Comments"] =  this.form_data.comments,
                            
                            send_data.form_data = Utility.serializeObject(perm_formdata);
                            console.log("Data ", send_data.form_data)
                            var vm = this;
                            $.ajax({
                                url : send_data.url,
                                type: "POST",
                                data : perm_formdata,
                                success: function(data, textStatus, jqXHR){
                                    vm.formSuccessPerm = true;
                                },
                                error: function (jqXHR, textStatus, errorThrown){
                                  console.log("Data load error: " + error.message);
                                  vm.formErrorPerm = true;
                                }
                            });
                        }
                    })
                }
            }
        });
    });
</script>