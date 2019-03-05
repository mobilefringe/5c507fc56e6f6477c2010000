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
                            <mapplic-map ref="mapplic_ref" :height="566" :minimap= "false" :deeplinking="false" :sidebar="false" :hovertip="true" :maxscale= "5" :storelist="mapStores" :floorlist="floorList" tooltiplabel="View Store Details" :svgHeight="2500" :svgWidth="2500"></mapplic-map>
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
                    pageBanner: null,
                    selected: "Select a Category",
                    floorOne: null,
                    floorTwo: null
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
                    // this.getSVGMap;
                    this.dataLoaded = true;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    "property",
                    "timezone",
                    "findRepoByName",
                    "processedCategories",
                    "storesByCategoryName",
                    "processedStores",
                ]),
                allCategories() {
                    var categories = this.processedCategories
                    var categoryData = [];
                    _.forEach(categories, function (value, key) {
                        if (value.store_ids != null) {
                            var name = value.name;
                            var id = value.id;
                            if (name != null && id != null) {
                                var object = {
                                    'label': name,
                                    'value': id,
                                }
                                categoryData.push(object)
                            }
                        }
                    });
                    
                    categoryData.unshift('All');
                    return categoryData
                },
                allStores() {
                    var all_stores = this.processedStores;
                    if (typeof(this.selected) == "string" || typeof(this.selected) == undefined){
                        _.forEach(all_stores, function(value, key) {
                            value.zoom = 2;
                            if(!value.svgmap_region){
                                value.svgmap_region = value.id;
                            }
                        });
                        return all_stores
                    } else {
                        try {
                            var catName = this.selected.value;
                            var sortedList = _.filter(all_stores, function(o) { return _.indexOf(o.categories, _.toNumber(catName)) > -1; });
                            return sortedList
                        } catch (e) {
                            console.log("errer", e)
                        }
                    }
                },
                mapStores() {
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
                getSVGMap() {
                    var svg_maps = this.findRepoByName("SVG Maps").images 
                    if(svg_maps && svg_maps.images)
                    var floor_one = "";
                    var floor_two = "";
                    _.forEach(svg_maps, function(value, key) {
                        if(value.id == 41084) {
                            floor_one = _.split(value.image_url, '?');
                            floor_one = floor_one[0];
                        }
                        if (value.id == 41085) {
                            floor_two = _.split(value.image_url, '?');
                            floor_two = floor_two[0];
                        }
                    });
                    this.floorOne = floor_one;
                    this.floorTwo = floor_two;
                },
                floorList () {
                    var floor_list = [];
                    
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Level One";
                    floor_1.map = this.floorOne;
                    // floor_1.minimap = this.miniOne;
                    floor_1.z_index = 1;
                    floor_1.show = true;
                    floor_list.push(floor_1);
                    
                    var floor_2 = {};
                    floor_2.id = "second-floor";
                    floor_2.title = "Level Two";
                    floor_2.map = this.floorTwo;
                    // floor_2.minimap = this.miniTwo;
                    floor_2.z_index = 2;
                    floor_2.show = false;
                    floor_list.push(floor_2);
                    
                    return floor_list;
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch("getData", "repos"), this.$store.dispatch("getData", "categories")]);
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