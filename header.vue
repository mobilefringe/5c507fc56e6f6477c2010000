<template>
    <div class="top_menu_container" :class="{'smallerHeader' : smallerHeader}">
        <div class="header-container hidden-phone " id="top" >
            <h1 v-if="property" style="display:none;">property.name</h1>
    		<div class="header page_container">
    			<div class="col-sm-6 text_left no_padding">
    				<router-link to="/" exact>
    					<img class="site-logo" :src="propertyLogo" :alt="property.name">
    				</router-link>
    				<span class="pull-right show_phone">
    					<!--<router-link style="background-color:transparent;" to="/newsletter" ><img src="//codecloud.cdn.speedyrails.net/sites/5b16b9686e6f6426c91e0000/image/png/1511797731769/newsletter.png" class="mobile_newsletter_btn" alt="Mobile Newsletter signup icon"></router-link>-->
					<div id="menu-icon" @click="show_mobile_menu = !show_mobile_menu" :class="{ open: show_mobile_menu}">
    					<span></span>
    					<span></span>
    					<span></span>
    					<span></span>
    				</div>
    				</span>
    			</div>
    			<div class="col-sm-6 hidden_phone">
    				<div class="social-div social_icons">
    					<!--<router-link to="/contact_us" style="font-size:12px; margin-right:10px; color:#666666;display: inline-block;height: 30px;line-height: 30px;">CONTACT US</router-link>-->
    					<!--<a href="https://www.pinterest.com/hrctoronto" target="_blank" class="social_link_icon social_twitter" :alt="property.name + ' Pinterest'"><i class="fa fa-pinterest"></i><p style="display:none;">Pinterest icon</p></a>-->
    					<!--<a href="https://www.instagram.com/" target="_blank" class="social_link_icon social_twitter" :alt="property.name + ' Instagram'"><i class="fa fa-instagram"></i><p style="display:none;">Instagram icon</p></a>-->
    					<!--<a href="http://www.twitter.com/" target="_blank" class="social_link_icon social_twitter" :alt="property.name + ' Twitter'"><i class="fa fa-twitter"></i><p style="display:none;">Twitter icon</p></a>-->
    					<!--<a href="http://www.facebook.com/" target="_blank" class="social_link_icon social_fb" :alt="property.name +' Facebook'"><i class="fa fa-facebook"></i><p style="display:none;">Facebook icon</p></a>-->
    					<div id="desktopHeader">
                            <div id="g_translater" class="text-right">
                                <div id="google_translate_element"></div>
                            </div>
                        </div>
    				</div>
    				<div class="newsletter-div">
    					<!--<div class="newsletter_box" style="margin-bottom:5px">-->
    					<!--	<div class="input_box">-->
    					<!--	    <label for="fieldEmail" style="display:none;">Enter Email Address</label>-->
    					<!--		<input class="sub_input_text" id="fieldEmail" name="cm-irudui-irudui" type="email" v-model="newsletter_email" required placeholder="ENTER YOUR EMAIL TO SUBSCRIBE" @keyup.enter="$router.push({path: '/newsletter?email='+ newsletter_email})"/>-->
    					<!--		<router-link style="background-color:transparent;" :to="'/newsletter?email='+ newsletter_email" ><img src="//codecloud.cdn.speedyrails.net/sites/5b16b9686e6f6426c91e0000/image/png/1511797731769/newsletter.png" alt="Newsletter signup icon"></router-link>-->
    					<!--	</div>-->
    					<!--</div>-->
    					<div id="search-form" class="search-form">
    						<div class="input_box">
    							<search-component v-if="headerReady" :list="searchList" placeholder="SEARCH" :suggestion-attribute="suggestionAttribute" :keys="keys" v-model="search_result" @select="onOptionSelect" :autocomplete="false" :minMatchCharLength="3" :tokenize="true">
    								<template slot="item" scope="option" class="manual">
    									<article class="media">
    										<p>
    											<strong>{{ option.data.name }}</strong>
    										</p>
    									</article>
    								</template>
    							</search-component>
    							<img src="//codecloud.cdn.speedyrails.net/sites/5b16b9686e6f6426c91e0000/image/png/1514998294110/search_icon.png" id="search_icon" alt="search icon"> 
    						</div>
    						<div class="input submit"></div>
    					</div>
    				</div>
    			</div>
    			<transition name="custom-classes-transition" enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
    				<div class="mobile_menu_container" v-show="show_mobile_menu">
    					<div class="opened_mobile_menu" >
    						<div class="text-left mobile-site-logo">
    							<img :src="propertyLogo"  :alt="property.name + ' Mobile Logo'">
    						</div>
    						<ul class="clearfix">
    							<li v-for="(item,key) in menu_items" class="menu_item">
							        <router-link :to="item.href" v-if="item.sub_menu == undefined">{{item.name}}</router-link>
							       
							        <div v-else role="tablist">
                                        <b-card no-body class="mb-1">
                                            <b-card-header header-tag="header" class="p-1" role="tab" @click="submenuOpen = !submenuOpen">
                                                <b-btn block href="#" v-b-toggle="$t(item.name)" variant="info">
                                                    {{$t(item.name)}}
                                                    <i v-if="!submenuOpen" class="fa fa-plus"></i>
                                                    <i v-else class="fa fa-minus"></i>
                                                </b-btn>
                                            </b-card-header>
                                            <b-collapse :id="$t(item.name)" accordion="my-accordion" role="tabpanel" class="accordion_body">
                                                <b-card-body v-for="sub_menu in item.sub_menu">
                                                    <p class="card-text">
                                                        <a v-if="sub_menu.external" :href="sub_menu.href" class="dropdown-item" target="_blank">{{sub_menu.name}}</a>
                                                        <router-link v-else :to="sub_menu.href">{{$t(sub_menu.name)}}</router-link>
                                                    </p>
                                                </b-card-body>
                                            </b-collapse>
                                        </b-card>
                                    </div>
							        
							    </li>
    						</ul>
    						<div class="tel_num" v-if="property && property.contact_phone">
    							<a :href="'tel:'+property.contact_phone">{{property.contact_phone}}</a>
    						</div>
    						<div class="m_menu_today_hour" v-if="getTodayHours">
    							 
    							<span v-if="getTodayHours.is_closed == null || !getTodayHours.is_closed ">Open Today:</span>
    						    <span v-else>Closed Today</span> 
    						    <span v-if="getTodayHours.is_closed == null || !getTodayHours.is_closed ">
    						       {{getTodayHours.open_time | moment("h:mma", timezone)}} - {{getTodayHours.close_time | moment("h:mma", timezone)}}
						        </span>
    						</div>
    						<div class="social_icons_menu show_phone text-center">
    							<a href="https://www.facebook.com/" target="_blank">
    							    <i class="fa fa-facebook"></i><p style="display:none;">Facebook icon</p>
    							</a>
    							<a href="https://twitter.com" target="_blank">
    							    <i class="fa fa-twitter"></i><p style="display:none;">Twitter icon</p>
    							</a>
    							<a href="https://www.instagram.com/" target="_blank">
    							    <i class="fa fa-instagram"></i><p style="display:none;">Instagram icon</p>
    							</a>
    							<!--<a href="https://www.pinterest.com/hrctoronto/" target="_blank">-->
    							<!--    <i class="fa fa-pinterest"></i><p style="display:none;">Pinterest icon</p>-->
    							<!--</a>-->
    						</div>
    					</div>
    				</div>
    			</transition>
    		</div>
    	</div>
    	<div class="menu-container hidden-phone ">
    		<div class="menu-div page_container">
    			<div class="row top_nav hidden_phone">
					<nav id="primary_nav">
						<ul>
						    <li v-for="item in menu_items" class="menu_item">
						        <router-link :to="item.href" class="hvr-underline-from-center" :id="item.id">{{$t(item.name)}}</router-link>
						        <ul v-if="item.sub_menu" class="dropdown-content">
						            <li v-for="sub_menu in item.sub_menu" class="dropdown_item">
						                <a v-if="sub_menu.external" :href="sub_menu.href" target="_blank" class="hvr-underline-from-center">{{$t(sub_menu.name)}}</a>
							            <router-link v-else :to="sub_menu.href" class="hvr-underline-from-center">{{$t(sub_menu.name)}}</router-link>
						            </li>
								</ul>
						    </li>
						</ul>
					</nav>
				</div>
    		</div>
    	</div>
	</div>
</template>

<script>
    define(["Vue", "vuex", 'json!menu_items.json', "bootstrap-vue", "google-translate"], function (Vue, Vuex, MenuItems, BootstrapVue, googleTranslate) {
        Vue.use(BootstrapVue);
        return Vue.component("header-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    dataLoaded: false,
                    show_mobile_menu: false,
                    search_result: null,
                    suggestionAttribute: "name",
                    keys: ["name", "description", "tags", "keywords", "store.name"],
                    newsletter_email: "",
                    menu_items: MenuItems,
                    propertyLogo: "//codecloud.cdn.speedyrails.net/sites/5c507fc56e6f6477c2010000/image/png/1548798567257/LanghamSquareLogo.png",
                    smallerHeader: false,
                    isSticky: 100,
                    headerReady: false,
                    submenuOpen: false,
                    m : false
                }
            },
            created(){
                window.addEventListener("scroll", this.makeNavbarSmall);
                this.loadData().then(response => {
                    this.headerReady = true;
                });
            },
            watch: {
                $route: function() {
                    var vm = this;
                    // hide dropdown when route changes
                    _.forEach(this.menu_items, function(value, key) {
                        value.show_sub_menu = false;
                    });
                    this.show_mobile_menu = false; //close menu when navigating to new page
                    this.$nextTick(function(){
                    this.toggleActiveCass();
                    });
                },
                show_mobile_menu: function() {
                    if(this.show_mobile_menu === true){
                        document.body.classList.add("no-scroll");
                    } else if (this.show_mobile_menu === false) {
                        document.body.classList.remove("no-scroll");
                    }
                }
            },
            mounted () {
                this.toggleActiveCass(); 
                this.$nextTick(() => {
                    this.googleTranslateInit();
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'getTodayHours',
                    'processedStores',
                    'processedEvents',
                    'processedPromos',
                    'processedJobs'
                ]),
                searchList() {
                    var events = this.processedEvents;
                    _.forEach(events, function (value, key) {
                        if (_.includes(value.eventable_type, 'Property')) {
                            value.is_store = false;
                        } else {
                            value.is_store = true;    
                        }
                    });
                    var promos = this.processedPromos;
                    _.forEach(promos, function (value, key) {
                        if (_.includes(value.promotionable_type, 'Property')) {
                            value.is_store = false;
                        } else {
                            value.is_store = true;    
                        }
                    });
                    var jobs = this.processedJobs;
                    _.forEach(jobs, function (value, key) {
                        if (_.includes(value.jobable_type, 'Property')) {
                            value.is_store = false;
                        } else {
                            value.is_store = true;    
                        }
                    });
                    var stores = this.processedStores;
                    _.forEach(stores, function (value, key) {
                        value.is_store = true;    
                    });
                    
                    var list = _.union( stores, events, promos, jobs );
                    return list;
                }
            },
            methods : {
                googleTranslateInit: function() {
                    let checkIfGoogleLoaded = setInterval(() => {
                        if (google.translate.TranslateElement != null) {
                            clearInterval(checkIfGoogleLoaded);
                            this.googleTranslateElement('google_translate_element');
                        }
                    }, 100);
                },
                googleTranslateElement: function(id) {
                    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,zh-CN,zh-CTW', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true, gaId: 'UA-115200481-13'}, id);
                    var vm = this;
                    setTimeout(function(){
                        if (vm.windowWidth < 768){
                            vm.m = true;
                            $('#g_translater').detach().appendTo('#google_translate_element_m');                            
                        }
                    }, 1500);
                    
                },
                loadData: async function() {
                    try{
                        
                        let results = await Promise.all([this.$store.dispatch("getData", "stores"), this.$store.dispatch("getData", "events"),this.$store.dispatch("getData", "promotions"),this.$store.dispatch("getData", "jobs")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);    
                    }
                },
                onOptionSelect(option) {
                    console.log("option", option)
                    this.$router.push({
                        name: "search-results",
                        query: { searchQuery: this.search_result },
                        params: { results: option }
                    });
                    this.$nextTick(function() {
                        this.search_result = "";
                    });
                    
                    
                },
                toggleSubMenu (id) {
                   this.menu_items.map(menu => {
                        if(menu.id !== id) {
                            menu.show_sub_menu = false;
                            menu.activeClass = false;
                        }
                        else {
                            menu.activeClass = true;
                        }
                    });
                },
                toggleActiveCass() {
                    var vm = this;
                    
                    _.forEach(this.menu_items, function(value, key) {
                        if(value.sub_menu && value.sub_menu.length > 0 ) {
                            var this_menu = _.filter(value.sub_menu, function(o){return o.href == vm.$route.path});
                            document.getElementById(value.id).classList.remove('router-link-active');
                            if(this_menu !== null && this_menu !== undefined && this_menu.length > 0) {
                                 document.getElementById(value.id).classList.add('router-link-active');
                            }
                        }
                    });
                },
                makeNavbarSmall(e) {
                  if (window.pageYOffset >= this.isSticky) {
                    this.smallerHeader = true;
                  } else {
                    this.smallerHeader = false;
                  }
                },
            },
            destroyed: function() {
                window.removeEventListener("scroll", this.makeNavbarSmall);
            }
        });
    });
</script>