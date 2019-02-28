<template>
    <div>
        <transition name="fade">
            <div v-if="dataLoaded" v-cloak>
                <div class="page_container margin_30">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="hidden_phone">
                                <h2 class="inside_page_title">Find Store</h2>
                                <v-select v-if="allCategories" v-model="selected" :options="allCategories" :searchable="false" class="category-select"></v-select>
                                <div class="store_list_container hidden-mobile" v-if="allStores">
                                    <p class="store_name" v-for="store in allStores" v-on:click="dropPin(store)">{{store.name}} <span v-if="store.name_2">({{store.name_2}})</span></p>
                                </div>
                            </div>
                            <div class="show_phone mobile_store_select">
                                <v-select 
                                    :options="allStores" 
                                    :placeholder="'Select A Store'" 
                                    :searchable="false" 
                                    :label="'name'" 
                                    :on-change="dropPin"
                                >
                                    <template slot="option" slot-scope="option">
                                        {{ option.name }} <span v-if="option.name_2">({{option.name_2}})</span>
                                    </template>
                                </v-select>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <mapplic-map ref="mapplic_ref" :height="566" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :maxscale= "5" :storelist="allStores" :floorlist="floorList" tooltiplabel="View Store Details" :svgHeight="2500" :svgWidth="2500"></mapplic-map>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    define(["Vue", "vuex", "vue!mapplic-svg", "vue-select"], function(Vue, Vuex, MapplicComponent, VueSelect) {
        Vue.component('v-select', VueSelect.VueSelect);
        return Vue.component("stores-component", {
            template: template, // the variable template will be injected
            props:['inside_banner'],
            data: function() {
                return {
                    dataLoaded: false,
                    pageBanner: null
                }
            },
            created (){
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Map Banner');
                    if(temp_repo && temp_repo.images) {
                       temp_repo = temp_repo.images;
                       this.pageBanner = temp_repo[0];
                    }
                    else {
                        this.pageBanner = {
                            "image_url": "//codecloud.cdn.speedyrails.net/sites/5b88438d6e6f641e8d3c0000/image/png/1531495616000/inside_banner.png"
                        }
                    }
                    this.getSVGMap;
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    "property",
                    "timezone",
                    "findRepoByName",
                    "processedStores",
                ]),
                allStores() {
                    var all_stores = this.processedStores;
                    _.forEach(all_stores, function(value, key) {
                        value.zoom = 2;
                        if(!value.svgmap_region){
                            value.svgmap_region = value.id;
                        }
                    });
                    var initZoom = {};
                    initZoom.svgmap_region = "init";
                    initZoom.z_coordinate = 1;
                    initZoom.x = 0.5;
                    initZoom.y = 0.5;
                    initZoom.zoom = 1;
                    all_stores.push(initZoom)
                    return all_stores
                },
                getSVGMap(){
                  return "//mallmaverick.com"+this.property.svgmap_url;  
                },
                floorList () {
                    var floor_list = [];
                    
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Level One";
                    floor_1.map = this.getSVGMap;
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
                        let results = await Promise.all([this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                onOptionSelect(option) {
                    this.$nextTick(function() {
                        this.storeSearch = ""
                    });
                    this.svgMapRef.addMarker(option);
                },
                dropPin(store) {
                    this.$refs.mapplic_ref.showLocation(store.svgmap_region);
                }
            }
        });
    });
</script>