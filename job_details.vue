<template>
	<div class="job_dets_container" v-if="currentJob">
		<div class="row page_container">
			<div class="col-sm-4 job_logo_container">
				<div>
					<!--<img v-lazy="currentJob.store.store_front_url_abs" alt=""/>-->
					<img
                    v-if="!currentJob.store.no_store_logo"
                    class="store_img hidden_phone"
                    :src="currentJob.store.store_front_url_abs"
                    alt
                  >
                  <div v-else class="no_logo_container hidden_phone">
                    <img
                      class="store_img "
                      src="//www.mallmaverick.com/system/site_images/photos/000/041/782/original/transparent_logo.png?1533845225"
                      alt
                    >
                        <h1 class="no_logo_text">
                        {{ currentJob.store.name }}
                        <span v-if="promo.store.name_2"><br>({{currentJob.store.name_2}})</span>
                          <!--<div class="store_text">-->
                          <!--  <h2></h2>-->
                          <!--</div>-->
                        </h1>
                    </div>
				</div>
				<div style="margin-left:0; margin-top: 25px;">
					<h1>{{currentJob.name}}</h1>
    				<p class="job_store_name">{{currentJob.store.name}}</p>
    				<p class="job_div_date">{{currentJob.start_date | moment("MMM D", timezone)}} - {{currentJob.end_date | moment("MMM D", timezone)}}</p>
				</div>
			</div>
			<div class="col-sm-8 job_image_container text-left">
				<div class="text-left job_description">
					<p v-html="currentJob.rich_description"></p>
				</div>
				<social-sharing :url="$root.shareURL('jobs',currentJob.slug)" :title="currentJob.title" :description="currentJob.body" :quote="_.truncate(currentJob.description, {'length': 99})" twitter-user="" :media="currentJob.image_url" inline-template >
                    <div class="blog-social-share">
                        <div class="social_share">
                        Share: 
                            <network network="facebook">
                                <i class="fa fa-facebook"></i>
                            </network>
                            <network network="twitter">
                                <i class="fa fa-twitter"></i>
                            </network>
                        </div>
                    </div>
                </social-sharing>
			</div>
		</div>
		<!--<div class="row page_container">-->
		<!--	<div class="col-sm-12 job_desc_container">-->
				
				
		<!--	</div>-->
		<!--</div>-->
		<div class="job_container page_container" v-if="storeJobs && storeJobs.length > 0">
		    <div class="job_container_title text-left all_caps"> OTHER {{currentJob.store.name | uppercase }} Jobs</div>
		    <div class="row job_job_dets text-left" v-for="job in storeJobs">
		        <div class="col-sm-7" >
		        <div class="promo_div_image">
		            <img v-lazy="job.store.store_front_url_abs" alt=""/>
		        </div>
		        </div>
		        <div class="col-sm-5 job_div_dets">
		            <p class="promo_div_name">{{job.name}}</p>
		            <p class="promo_div_job_name">{{job.store.name | uppercase}}</p>
		            <p class="promo_div_date">{{job.start_date | moment("MMM D", timezone)}} - {{job.end_date | moment("MMM D", timezone)}}</p>
		            <p class="promo_div_description">{{job.description_short}}</p>
					<span class="feature_read_more">
						<router-link :to="'/jobs/'+job.slug" class="mobile_readmore" >
							<p class="feature-readmore">Read More <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
						</router-link>
					</span>
		        </div>
		    </div>
		</div>
	</div>
</template>
<style>
    .job_div_dets {
        margin:20px auto;
    }
    .job_logo_container,
    .job_image_container,
    .job_details_container,
    .job_desc_container{
        padding: 20px 10px;
    }
    .job_image_container img{
        max-height: 300px;
    }
    .job_logo_container img{
        border: 1px solid #aea99e;
        width:300px;
        height:300px
    }
    .job_details_container h1{
        padding: 0;
    }
    .job_store_name, .job_div_date{
        font-size: 16px;
    }
    .job_container_title{
        border-top:1px solid #aea99e;
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
</style>
<script>
    define(['Vue', 'vuex', 'moment', 'vue-lazy-load'], function(Vue, Vuex, moment, VueLazyload) {
        Vue.use(VueLazyload);
        return Vue.component("job-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentJob: null,
                    storeJobs : null
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                this.currentJob = this.findJobBySlug(to.params.id);
                if (this.currentJob === null || this.currentJob === undefined) {
                    this.$router.replace({
                        name: '404'
                    });
                }
                next();
            },
            created() {
                this.$store.dispatch("getData", "jobs").then(response => {
                    this.updateCurrentJob(this.id);
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            watch: {
                currentJob : function (){
                    if(this.currentJob != null) {
                        // if (this.currentJob.store != null && this.currentJob.store != undefined && _.includes(this.currentJob.store.store_front_url_abs, 'missing')) {
                        //     this.currentJob.store.store_front_url_abs = "//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548062300000/Mall_StoreLogo_600x600px_Template.jpg";
                        // }
                        // else if (this.currentJob.store == null || this.currentJob.store == undefined) {
                        //     this.currentJob.store = {};
                        //     this.currentJob.store.store_front_url_abs =  "//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548062300000/Mall_StoreLogo_600x600px_Template.jpg";
                        // }
                        if (this.currentJob.store == null || this.currentJob.store == undefined) {
                            this.currentJob.store = {};
                            this.currentJob.store.name =  this.property.name;
                            this.currentJob.store.no_store_logo = true
                        }
                        else {
                            if (_.includes(this.currentJob.store.store_front_url_abs, 'missing')) {
                              this.currentJob.store.no_store_logo = true
                            } else {
                              this.currentJob.store.no_store_logo = false
                            }
                        }
                    var vm = this;
                    var temp_job = [];
                    var current_id =_.toNumber(this.currentJob.id);
                    _.forEach(this.currentJob.store.jobs, function(value, key) {
                        if(_.toNumber(value) != current_id){
                            var current_job = vm.findJobById(value);
                            current_job.description_short = _.truncate(current_job.description, {'length': 70});
                            temp_job.push(current_job);
                        }
                    });
                        this.storeJobs = temp_job;
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedJobs',
                    'findJobBySlug',
                    'findJobById'
                ]),
                allJobs() {
                    return this.processedJobs;
                }
            },
            methods: {
                updateCurrentJob(id) {
                    this.currentJob = this.findJobBySlug(id);
                    if (this.currentJob === null || this.currentJob === undefined) {
                        this.$router.replace({ path: '/'});
                    }
                }
            }
        });
    });
</script>