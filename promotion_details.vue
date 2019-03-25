<template>
	<div class="promo_dets_container" v-if="currentPromo">
		<div class="row page_container">
			<div class="col-sm-4 event_logo_container">
				<div>
					<!--<img :src="currentPromo.store.store_front_url_abs" :alt="currentPromo.store.name" class="hidden_phone"/>-->
					<img
                    v-if="!currentPromo.store.no_store_logo"
                    class="store_img hidden_phone"
                    :src="currentPromo.store.store_front_url_abs"
                    alt
                  >
                  <div v-else class="no_logo_container hidden_phone">
                    <img
                      class="store_img "
                      src="//www.mallmaverick.com/system/site_images/photos/000/041/782/original/transparent_logo.png?1533845225"
                      alt
                    >
                        <h1 class="no_logo_text">
                        {{ currentPromo.store.name }}
                        <span v-if="currentPromo.store.name_2"><br>({{currentPromo.store.name_2}})</span>
                          <!--<div class="store_text">-->
                          <!--  <h2></h2>-->
                          <!--</div>-->
                        </h1>
                    </div>
					<!--<img  v-if="!_.includes(currentPromo.image_url, 'missing')" :src="currentPromo.image_url" :alt="currentPromo.name" class="promo_image show_phone"/>-->
				</div>
				<div style="margin-left:0; margin-top: 25px;">
					<h1>{{currentPromo.name}}</h1>
					<router-link :to="'/stores/'+currentPromo.store.slug"><p class="promo_store_name">{{currentPromo.store.name}} <span v-if="currentPromo.store.name_2">({{currentPromo.store.name_2}})</span></p></router-link>
					<p class="promo_div_date">{{currentPromo.start_date | moment("MMM D, YYYY", timezone)}} - {{currentPromo.end_date | moment("MMM D, YYYY", timezone)}}</p>
				</div>
			</div>
			<div class="col-sm-8 event_image_container text-left">
				<img v-if="!_.includes(currentPromo.image_url, 'missing')" :src="currentPromo.image_url" :alt="currentPromo.name" class=""/>
				<div class="event_desc_container">
				    <div class="text-left promo_description">
    				    <p v-html="currentPromo.rich_description"></p>
    				</div>
				</div>
				<social-sharing :url="$root.shareURL('promotions',currentPromo.slug)" :title="currentPromo.title" :description="currentPromo.body" :quote="_.truncate(currentPromo.description, {'length': 99})" twitter-user="" :media="currentPromo.image_url" inline-template >
                    <div class="blog-social-share text-left">
                        <p style="display: inline-block;">Share: </p>
                        <div class="social_share" style="display: inline-block;">
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
		<div class="promo_promo_container page_container" v-if="storePromos && storePromos.length > 0">
		    <div class="promo_container_title text-left all_caps"> OTHER {{currentPromo.store.name | uppercase }} Promotions</div>
		    <div class="row promo_promo_dets text-left" v-for="promo in storePromos">
		        <div class="col-sm-7" >
		        <div class="promo_div_image">
		            <img :src="promo.image_url" :alt="promo.name"/>
		        </div>
		        </div>
		        <div class="col-sm-5 promo_div_dets">
		            <p class="promo_div_name">{{promo.name}}</p>
		            <p class="promo_div_promo_name">{{promo.store.name | uppercase}}</p>
		            <p class="promo_div_date">{{promo.start_date | moment("MMM D, YYYY", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
		            <p class="promo_div_description">{{promo.description_short}}</p>
					<span class="feature_read_more">
						<router-link :to="'/promotions/'+promo.slug" class="mobile_readmore" >
							<p class="feature-readmore  hvr-sweep-to-right" :aria="promo.name">View Promotion Details <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
						</router-link>
					</span>
		        </div>
		    </div>
		</div>
	</div>
</template>
<style>
    #promo_dets_container .promo_logo_container,
    #promo_dets_container .promo_image_container,
    #promo_dets_container .promo_details_container,
    #promo_dets_container .promo_desc_container{
        padding: 20px 10px;
    }
    #promo_dets_container .promo_image_container img{
        max-height: 300px;
    }
    #promo_dets_container .promo_logo_container img{
        border: 1px solid #aea99e;
        width:300px;
        height:300px
    }
    #promo_dets_container .promo_details_container h1{
        padding: 0;
    }
    #promo_dets_container .promo_store_name, .promo_div_date{
        font-size: 16px;
    }
    #promo_dets_container .promo_container_title{
        border-top:1px solid #aea99e;
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
</style>
<script>
    define(['Vue', 'vuex', 'moment', 'vue-lazy-load'], function(Vue, Vuex, moment, VueLazyload) {
        Vue.use(VueLazyload);
        return Vue.component("promo-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentPromo: null,
                    storePromos : null
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                this.updateCurrentPromo(to.params.id);
                next();
            },
            created(){
                this.$store.dispatch("getData", "promotions").then(response => {
                    this.updateCurrentPromo(this.id);
                }, error => {
                  console.error("Could not retrieve data from server. Please check internet connection and try again.");
                });
            },
            watch: {
                currentPromo : function (){
                    if(this.currentPromo != null) {
                        // if (this.currentPromo.store != null && this.currentPromo.store != undefined && _.includes(this.currentPromo.store.store_front_url_abs, 'missing')) {
                        //     this.currentPromo.store.store_front_url_abs = this.property.default_logo_url;
                        // }
                         if (this.currentPromo.store == null || this.currentPromo.store == undefined) {
                            this.currentPromo.store = {};
                            this.currentPromo.store.name =  this.property.name;
                            this.currentPromo.store.no_store_logo = true
                        }
                        else {
                            if (_.includes(this.currentPromo.store.store_front_url_abs, 'missing')) {
                              this.currentPromo.store.no_store_logo = true
                            } else {
                              this.currentPromo.store.no_store_logo = false
                            }
                        }
                        
                        // if(this.currentPromo.type == "event"){
                        //      this.currentPromo.store = {};
                        //     this.currentPromo.store.store_front_url_abs =  this.property.default_logo_url;
                        // }
                        
                        var vm = this;
                        var temp_promo = [];
                        var current_id =_.toNumber(this.currentPromo.id);
                        if(this.currentPromo == "promotion") {
                            _.forEach(this.currentPromo.store.promotions, function(value, key) {
                                if(_.toNumber(value) != current_id){
                                    var current_promo = vm.findPromoById(value);
                                    current_promo.description_short = _.truncate(current_promo.description, {'length': 70});
                                    temp_promo.push(current_promo);
                                }
                            });
                            this.storePromos = temp_promo;
                        }
                    }
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'processedPromos',
                    'findPromoBySlug',
                    'findPromoById',
                    'findEventBySlug',
                    'findEventById',
                    'timezone'
                ]),
                allPromos() {
                    return this.processedPromos;
                },
            },
            methods: {
                updateCurrentPromo (id) {
                    this.currentPromo = this.findPromoBySlug(id);
                    if (this.currentPromo === null || this.currentPromo === undefined){
                        this.currentPromo = this.findEventBySlug(id);
                        if (this.currentPromo === null || this.currentPromo === undefined){
                            this.$router.replace({ path: '/'});
                        } else {
                            this.currentPromo.type = "event";
                        }
                    } 
                    else {
                        this.currentPromo.type = "promotion";
                    }
                },
                shareURL(slug){
                    var share_url= "http://www.langhamsquare.ca/promotions/" + slug;
                    return share_url;
                }
            }
        });
    });
</script>