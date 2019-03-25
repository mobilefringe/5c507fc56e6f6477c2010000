<template>
	<div class="events_container" v-if="dataLoaded"><!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="promo_container" v-if="events.length > 0">
		    <div class=" promo_dets" v-for="promo in events">
    			<div class="row page_container">
    				<div class="col-sm-7" >
    					<div class="promo_div_image" v-lazy-container="{ selector: 'img' }">
    						<img :data-src="promo.image_url"  data-loading='//codecloud.cdn.speedyrails.net/sites/5b16b9686e6f6426c91e0000/image/png/1521035009104/Screen Shot 2018-03-14 at 9.43.24 AM.png' alt=""/>
    					</div>
    				</div>
    				<div class="col-sm-5 promo_div_dets text-left">
    					<p class="promo_div_name">{{promo.name}}</p>
    					<p class="promo_div_date">{{promo.start_date | moment("MMM D, YYYY", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
    					<p class="promo_div_description">{{promo.description_short}}</p>
    					<div class="promo_feature_share row is-table-row">
        					<span class="feature_read_more col-sm-8">
        						<router-link :to="'/events/'+promo.slug" class="mobile_readmore" >
        							<p class="feature-readmore hvr-sweep-to-right" :aria="promo.name">View Event Details<i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
        						</router-link>
        					</span>
        					<div class="text-right  col-sm-4" v-if="promo">
            					<social-sharing :url="$root.shareURL('events',promo.slug)" :title="promo.title" :description="promo.body" :quote="_.truncate(promo.description, {'length': 99})" twitter-user="" :media="promo.image_url" inline-template >
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
		</div>
		<div class="promo_container page_container" v-else>
		    <p style="padding:20px"> Sorry, no events are currently available.</p>
		</div>
	</div>
</template>

<style>
    .events_container .promo_container{
        border-top: 1px solid #aea99e;
    }
    .events_container .all_dates span.active { 
        background-color: #bababa;
    }
    .events_container .promo_dets {
        border-bottom: 1px solid #aea99e;
    }
    .events_container .promo_dets:last-child {
        border-bottom: none;
    }
    .events_container .feature_read_more {
        width : auto;
    }
</style>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", "vue-lazy-load"], function(Vue, Vuex, moment, tz, VueMoment, Meta, VueLazyload) {
        Vue.use(Meta);
        Vue.use(VueLazyload);
        return Vue.component("events-component", {
            template: template, // the variable template will be injected
            data () {
              return {
                  dataLoaded: false
              }  
            },
            created () {
                this.$store.dispatch("getData", "events").then(response => {
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
                    'processedEvents'
                ]),
                events() {
                    var vm = this;
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.processedEvents, function(value, key) {
                        value.description_short = _.truncate(value.description, {
                            'length': 70
                        });
                        // if (value.store != null && value.store != undefined && _.includes(value.store.image_url, 'missing')) {
                        //     value.store.image_url = vm.property.default_logo_url;
                        // }
                        if (_.includes(value.image_url, 'missing')) {
                            value.image_url = "//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/jpeg/1548062300000/Mall_StoreLogo_600x600px_Template.jpg";
                        }
                            
                        temp_promo.push(value);
                    });
                    
                    _.sortBy(temp_promo, [function(o) { return o.start_date; }]);
                    return temp_promo;
                }
            }
        });
    });
</script>