<template>
	<div class="page_container store_dets_container" v-if="dataLoaded" id="store_dets_container">
		<div class="row">
			<div class="col-md-4 store_logo_container">
				<div>
					<!--<img :src="currentStore.store_front_url_abs" :alt="currentStore.name"/>-->
					<img
                    v-if="!currentStore.no_store_logo"
                    class="store_img"
                    :src="currentStore.store_front_url_abs"
                    alt
                  >
                  <div v-else class="no_logo_container">
                    <img
                      class="store_img"
                      src="//www.mallmaverick.com/system/site_images/photos/000/041/782/original/transparent_logo.png?1533845225"
                      alt
                    >
                        <h1 class="no_logo_text">
                        {{ currentStore.name }}
                        <span v-if="currentStore.name_2"><br/>({{currentStore.name_2}})</span>
                          <!--<div class="store_text">-->
                          <!--  <h2></h2>-->
                          <!--</div>-->
                        </h1>
                    </div>
				</div>
			</div>
			<div class="col-md-8 store_map_container">
				<div id="mapsvg_store_detail">
					<mapplic-map ref="svgmap_ref" :height="300" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :maxscale= "5" :storelist="processedStores" :floorlist="floorList" :svgWidth="2500" :svgHeight="2500" @updateMap="updateSVGMap" :key="currentStore.id"></mapplic-map>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-4 store_details_container">
				<div>
					<h1>{{currentStore.name}}<span v-if="currentStore.name_2"><br/>({{currentStore.name_2}})</span></h1>
					<p>{{currentStore.category_name}}</p>
					<p>{{currentStore.phone}}</p>
					<div class="margin_20">
					    <a v-bind:href="'//'+currentStore.website" target="_blank">Visit Store Website</a>    
					</div>
					
					<div v-if="currentStore.store_hours && currentStore.store_hours.length > 0">
					    <p class="underline">Store Hours</p>
					    <ul class="store_details_hours">
                            <li v-if="!hour.is_closed" v-for="hour in hours">
                                <span class="day day col-xs-6">{{hour.day_of_week | moment("dddd", timezone)}}: </span><span class="hour">{{hour.open_time | moment("h:mma", timezone)}} - {{hour.close_time | moment("h:mma", timezone)}}</span>
                            </li>
                            <li v-else>
                                <span class="day">{{hour.day_of_week | moment("dddd", timezone)}}: </span><span class="hour">CLOSED</span>
                            </li>
                        </ul>
					</div>
				</div>
			</div>
			<div class="col-sm-8 store_desc_container">
				<div class="text-left store_description">
					<p>{{currentStore.description}}</p>
				</div>
			</div>
		</div>
		<div class="store_promo_container" v-if="currentStore && currentStore.total_published_promos > 0">
		    <div class="promo_container_title text-left all_caps"> Sales & Promotions</div>
		    <div class="row store_promo_dets text-left" v-for="promo in promotions">
		        <div class="col-sm-7" >
		        <div class="promo_div_image">
		            <img :src="promo.image_url" :alt="promo.name"/>
		        </div>
		        </div>
		        <div class="col-sm-5 promo_div_dets">
		            <p class="promo_div_name">{{promo.name}}</p>
		            <p class="promo_div_store_name">{{currentStore.name | uppercase}}</p>
		            <p class="promo_div_date">{{promo.start_date | moment("MMM D", timezone)}} - {{promo.end_date | moment("MMM D", timezone)}}</p>
					<p class="promo_div_description">{{promo.description_short}}</p>
					<span class="feature_read_more">
						<router-link :to="'/promotions_and_events/'+promo.slug" class="mobile_readmore" >
							<p class="feature-readmore   hvr-sweep-to-right">Promotion Details <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>
						</router-link>
					</span>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
    define(['Vue', 'vuex', 'moment', "vue!mapplic-svg"], function(Vue, Vuex, moment, MapplicComponent) {
        return Vue.component("store-details-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    currentStore: null,
                    promotions : [],
                    jobs:[],
                    hours: [],
                    dataLoaded: false
                }
            },
            props:['id'],
            beforeRouteUpdate(to, from, next) {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.updateCurrentStore(to.params.id);
                });
                next();
            },
            created (){
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.updateCurrentStore(this.id);
                });
            },
            watch: {
                currentStore: function() {
                    this.currentStore.zoom = 2;
                    if (_.includes(this.currentStore.store_front_url_abs, 'missing')) {
                      this.currentStore.no_store_logo = true
                    } else {
                      this.currentStore.no_store_logo = false
                    }
                    
                    var vm = this;
                    if (this.currentStore.store_hours) {
                        var storeHours = [];
                        _.forEach(this.currentStore.store_hours, function (value, key) {
                            storeHours.push(vm.findHourById(value));
                        });
                        this.hours = storeHours;
                    }
                    
                    var temp_promo = [];
                    var temp_job = [];
                    _.forEach(this.currentStore.promotions, function(value, key) {
                        var current_promo = vm.findPromoById(value);
                        current_promo.description_short = _.truncate(current_promo.description, {
                            'length': 70
                        });
                        temp_promo.push(current_promo);
                    });
                    _.forEach(this.currentStore.jobs, function(value, key) {
                        var current_job = vm.findJobById(value);
                        current_job.description_short = _.truncate(current_job.description, {
                            'length': 70
                        });
                        temp_job.push(current_job);

                    })
                    this.promotions = temp_promo;
                    this.jobs = temp_job;
                    
                    // setTimeout(function() {
                    //     vm.addLandmark(vm.currentStore);
                    // }, 500);
                },
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'findStoreBySlug',
                    'findHourById',
                    'findPromoById',
                    'findJobById',
                    'findRepoByName'
                ]),
                getSVGurl() {
                    console.log("this.property.svgmap_url", this.property.svgmap_url)
                    return "https://www.mallmaverick.com" + this.property.svgmap_url;
                },
                svgMapRef() {
                    return this.$refs.svgmap_ref;
                },
                allStores() {
                    this.processedStores.map(function(store){
                        
                        if (!store.svgmap_region) {
                          store.svgmap_region = store.id
                        }
                        store.zoom = 4;
                    })
                    return this.processedStores;
                },
                floorList () {
                    var floor_list = [];
                    
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Level One";
                    floor_1.map = this.getSVGurl;
                    // floor_1.minimap = this.miniOne;
                    floor_1.z_index = null;
                    floor_1.show = true;
                    floor_list.push(floor_1);
                    return floor_list;
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData","promotions"), this.$store.dispatch("getData", "jobs"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                updateCurrentStore (id) {
                    this.currentStore = this.findStoreBySlug(id);
                    if (this.currentStore === null || this.currentStore === undefined){
                        this.$router.replace({ path: '/'});
                    }
                },
                updateSVGMap(map) {
                    this.map = map;
                    this.svgMapRef.showLocation(this.currentStore.svgmap_region);
                    this.svgMapRef.addActiveClass(this.currentStore.svgmap_region);
                },
                dropPin(store) {
                    this.svgMapRef.showLocation(store.svgmap_region);
                },
            }
        });
    });
</script>