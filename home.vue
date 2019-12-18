<template>
    <div>
        <!--<transition name="fade">-->
        	<div class="row page_container" v-if="dataLoaded" v-cloak>
        	    <div class="custom_popup" v-if="show_popup">
                    <div class="popup_form_div">
                        <h2 class="pop_up_header p_name">Join Our eClub</h2>
                        <img class="text-left width_100 hide_desk custom_img" :src="popup.image_url" :alt="popup.name"/>
                        <h3 class="text-right right_desc hide_desk custom_text"></h3>
                        <div class="custom_row">
                            <div class="col-md-6">
                                <section class="">
                                    <form id="form_popup" class="" action="//mobilefringe.createsend.com/t/d/s/irudui/" method="POST">	
                                        <input type="hidden" value="Popup" name="cm-f-tdyudu" />
                                        <input type="hidden" value="" name="cm-name" id="cm-name" v-model="formData.name" />
                                        <label for="FNAME" class="main_label"><span class="">First Name</span>
                                            <input id="FNAME" name="first_name" placeholder="" class="custom_field_control" required="required" type="text" value="" v-model="formData.firstname">
                                        </label>
                                        <label for="LNAME" class="main_label"><span class="">Last Name</span>
                                            <input id="LNAME" name="last_name" placeholder="" class="custom_field_control" required="required" type="text" value=""  v-model="formData.lastname">
                                        </label>
                                        <label for="EMAIL" class="main_label"><span class="">Email Address</span>
                                            <input id="EMAIL" name="cm-irudui-irudui" placeholder="" class="custom_field_control" required="required" type="email" value="">	
                                        </label>
                                        <label for="PCODE" class="main_label"><span class="">Postal Code</span>
                					        <input id="PCODE" name="cm-f-jtukjj" placeholder="" class="custom_field_control" required="required" type="text" value="">
                                        </label>
                                        <label for="FMALEMALE" class="main_label radio_main"><span class="">Female/Male</span>
                                            <label for="FMALEMALE-1" class="radio_inside" required="required">
                                                <input type="radio" name="cm-f-tdyuhl" id="FMALEMALE-1" checked="checked" value="Female">
                                                <span class="">Female</span>
                                            </label>
                                            <label for="FMALEMALE-2" class="radio_inside">
                                                <input type="radio" name="cm-f-tdyuhl" id="FMALEMALE-2" value="Male">
                                                <span class="">Male</span>
                                            </label>
                                        </label>
                                        <label class="main_label">
                                            <input type="checkbox" id="popup_agree" required />
                                            I agree to receive emails from {{property.name}}.
                                        </label>
                                        <button type="submit" class="popup_submit">Submit</button>	
                                    </form>	
                                </section>
                            </div>
                            <div class="col-md-6 hide_phone">
                                <img class="text-left width_100 custom_img" :src="popup.image_url" />
                                <h2 class="text-right right_header p_name">Join Our eClub today!</h2>
                                <h3 class="text-right right_desc custom_text"></h3>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <span class="close_popup" @click="closePopup">CLOSE</span>
                </div>
        		<div class="banner_div">
        			<div class="main_banner col-sm-9">
        				<div  class="prev"></div>
        				<slick ref="slick" :options="slickOptions">
        					<div class="" v-for="banner in banners" v-if="banners">
        						<a v-if="banner.url" :href="banner.url">
        						    <img :src="banner.image_url" class="hvr-grow-shadow" :alt="banner.name">
        						</a>
        						<img v-else :src="banner.image_url" class="hvr-grow-shadow" :alt="banner.name">
        					</div>
        				</slick>
        				<div class="next"></div>
        			</div>
        			<div class="top_two hidden_phone col-sm-3">
        				<div class="banner_features"  v-for="feature in banner_features">
        					<router-link :to="feature.url" class="hvr-grow-shadow">
        						<img class="top_image" :src='feature.image_url' :alt="'Click here for more info on ' +feature.name"/>
        						<div class="feature_overlay text-uppercase ">{{feature.name}}</div>
        					</router-link>
        				</div>
        			</div>
        		</div>
        		<div>
        			<div class="feature-div clearfix">
        				<!--<span>-->
        					<div class="feature-box col-sm-4" v-for="item in feature_items">
        						<!--<p class="feature-title">{{item.name}}</p>-->
        						<!--<img :src="item.image_url" class="feature-image" :alt="'Click here for more info on '+item.name"/>-->
        						<router-link :to="item.url" class=" feature_link">
            						<img class="hvr-grow-shadow" :src='item.image_url' :alt="'Click here for more info on ' +item.name"/>
            						<div class="feature_overlay text-uppercase ">{{item.name}}</div>
        					    </router-link>
        						<!--<p class="feature-html">{{item.html}}</p>-->
        						<!--<span class="feature_read_more">-->
        						<!--    <a v-if="item.external" :href="item.url" class="mobile_readmore" target="_blank">-->
        						<!--        <p class="feature-readmore hvr-sweep-to-right">View {{item.name}}<i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>-->
        						<!--    </a>-->
        						<!--	<router-link v-else :to="item.url" class="mobile_readmore">-->
        						<!--		<p class="feature-readmore hvr-sweep-to-right">View {{item.name}}<i class="fa fa-chevron-right pull-right" aria-hidden="true"></i></p>-->
        						<!--	</router-link>-->
        						<!--</span>-->
        					</div>
        				<!--</span>-->
        			</div>
        		</div>
        	</div>
        <!--</transition>-->
    </div>
    
</template>

<script>
    define(["Vue", "vuex", "vue!today_hours", 'vue!vue-slick','js-cookie'], function(Vue, Vuex, TodayHoursComponent, slick, Cookies, Meta) {
        Vue.use(Meta);
        return Vue.component("home-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    suggestionAttribute: 'name',
                    search: '',
                    slickOptions: {
                        slidesToShow: 1,
                        dots : true,
                        arrows:true,
                        prevArrow: '.prev',
                        nextArrow: '.next',
                        autoplay: true,
                        autoplaySpeed: 5000
                    },
                    dataLoaded: false,
                    show_popup: false,
                    popup: null,
                    formData : {},
                    meta: {
                        meta_title: "",
                        meta_description: "",
                        meta_keywords: ""
                    }
                }
            },
            created () {
                this.loadData().then(response => {
                    this.dataLoaded = true;
                    this.popup = this.$store.state.popups[0];
                    this.meta = this.findMetaDataByPath(this.$route.path);
                });
            },
            watch : {
                dataLoaded () {
                    var viewed = Cookies.get('popup_viewed');
                    if(this.popup !== null && this.popup !== undefined && viewed !== "true") {
                        Cookies.set('popup_viewed', "true");
                        viewed = Cookies.get('popup_viewed');
                        this.show_popup = true;
                        this.popup.image_url = "//mallmaverick.cdn.speedyrails.net" + this.popup.photo_url;
                        document.getElementById('popup_backdrop').style.display = "block";
                    }
                    else {
                        document.getElementById('popup_backdrop').style.display = "none";
                    }
                },
                formData () {
                    this.formData.name = this.formData.firstname + " " + this.formData.lastname; 
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'findMetaDataByPath'
                ]),
                banners () {
                    var banners = [];//this.$store.state.banners;
                    _.forEach(this.$store.state.banners, function(value, key) {
                        var today = new Date();
                        var start = new Date (value.start_date);
                        if (start <= today){
                            if (value.end_date){
                                var end = new Date (value.end_date);
                                if (end >= today){
                                    banners.push(value);  
                                }
                            } else {
                                banners.push(value);
                            }
                        }
                    })
                    return _.orderBy(banners, ['position'], ['asc']);
                },
                banner_features () {
                    return  _.slice(this.$store.state.feature_items, 0, 2);
                },
                feature_items () {
                    var features = _.slice(this.$store.state.feature_items, 2,this.$store.state.feature_items.length );
                    features.map(function(feature){
                        if( _.includes(feature.url,'//')) {
                            feature.external = true;
                        } else {
                            feature.external = false;
                        }
                    })
                    return features;
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "banners"), this.$store.dispatch("getData", "feature_items"), this.$store.dispatch("getData", "promotions"), this.$store.dispatch("getData", "popups")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                closePopup() {
                    this.show_popup = false;
                    document.getElementById('popup_backdrop').style.display = "none";
                }
            },
            metaInfo () {
                return {
                    title: this.meta.meta_title,
                    meta: [
                        {name: 'description', content: this.meta.meta_description},
                        {name: 'keywords', content: this.meta.meta_keywords}
                    ] 
                }
            }
        })
    })
</script>