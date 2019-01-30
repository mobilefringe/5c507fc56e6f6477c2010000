<template>
	<div class="page_container jobs_container" v-if="dataLoaded"><!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="promo_container" v-if="jobs.length > 0">
			<div class="row promo_dets is-table-row" v-for="promo in jobs">
				<div class="col-sm-7" >
					<div class="promo_div_image"  v-lazy-container="{ selector: 'img' }">
						<img :data-src="promo.image_url" data-loading='//codecloud.cdn.speedyrails.net/sites/5b16b9686e6f6426c91e0000/image/png/1521035009104/Screen Shot 2018-03-14 at 9.43.24 AM.png' alt=""/>
					</div>
				</div>
				<div class="col-sm-5 promo_div_dets text-left">
					<p class="promo_div_name">{{promo.name}}</p>
					<p class="promo_div_store_name" v-if="promo.store">{{promo.store.name | uppercase}}</p>
					<p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
					<p class="promo_div_description">{{promo.description_short}}</p>
					<div class="promo_feature_share row is-table-row">
    					<span class="feature_read_more col-sm-6">
    						<router-link :to="'/jobs/'+promo.slug" class="mobile_readmore" >
    							<p class="feature-readmore hvr-sweep-to-right" :aria="promo.name">View Job Detail <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
    						</router-link>
    					</span>
    					<div class="text-right  col-sm-6" v-if="promo">
        					<social-sharing :url="shareURL(promo.slug)" :title="promo.title" :description="promo.body" :quote="_.truncate(promo.description, {'length': 99})" twitter-user="" :media="promo.image_url" inline-template >
                            <div class="blog-social-share">
                                <div class="social_share">
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
				</div>
			</div>
		</div>
		<div class="promo_container" v-else>
		    <p style="padding:20px">  Sorry, No sales or jobs available for this day. </p>
		</div>
	</div>
</template>

<style>
    .jobs_container .promo_dets {
        border-bottom: 1px solid #aea99e;
    }
    .jobs_container .row.is-table-row {
        margin: 0;
    }
    .jobs_container .row.is-table-row [class*="col-"] {
        padding:0;
    }
    .jobs_container .feature_read_more {
        width : auto;
    }
    /*.jobs_container .social_share span {*/
    /*    display:inline-block;*/
    /*    cursor: pointer;*/
    /*    margin: 0 2px;*/
    /*}*/
    
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-lazy-load"], function(Vue, Vuex, moment, tz, VueMoment, Meta, VueLazyload) {
        Vue.use(Meta);
        Vue.use(VueLazyload);
        return Vue.component("jobs-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    dataLoaded: false
                }
            },
            created() {
                this.$store.dispatch("getData", "jobs").then(response => {
                    this.dataLoaded = true;
                }, error => {
                    console.error("Could not retrieve data from server. Please check internet connection and try again.");
                    this.$router.replace({ path: '/'});
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedJobs'
                ]),
                jobs() {
                    var vm = this;
                    this.processedJobs.map(job => {
                        job.description_short = _.truncate(job.description, {
                            'length': 70
                        });
                        // if (job.store != null && job.store != undefined && _.includes(job.store.store_front_url_abs, 'missing')) {
                        //     job.store.store_front_url_abs = vm.property.default_logo_url;
                        // }
                        // if (job.store == null || job.store == undefined) {
                        //     job.store = {};
                        //     job.store.store_front_url_abs = vm.property.default_logo_url;
                        // }
                        job.image_url = "//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548062300000/Mall_StoreLogo_600x600px_Template.jpg"
                    });
                    _.sortBy(this.processedJobs, [function(o) {
                        return o.start_date;
                    }]);
                    return this.processedJobs;
                }
            }
        });
    });
</script>