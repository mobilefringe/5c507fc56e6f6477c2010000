define([], function() {
    function e(e) {
        return function(t) {
            require(["vue!"+e+".vue"], t)
        }
    }
    return[{
        path: "/", 
        component: e("home")
    }, {
        path:"/stores", 
        component:e("default"), 
        children:[ {
            path: "", component: e("stores"), name: "storeList"
        }, {
            path: ":id", 
            component: e("store_details"), 
            name: "storeDetails", 
            props: !0
        }]
    }, {
        path:"/businesses", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("businesses"), 
            name: "businessList"
        }]
    }, {
        path:"/restaurants", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("restaurants"), 
            name: "restaurantList"
        }]
    }, {
        path:"/promotions", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("promotions"), 
            name: "promoList"
        }, {
            path: ":id", 
            component: e("promotion_details"), 
            name: "promotionDetails", 
            props: !0
        }]
    }, {
        path:"/events", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("events"), 
            name: "eventList"
        }, {
            path: ":id", 
            component: e("event_details"), 
            name: "eventDetails", 
            props: !0
        }]
    }, {
        path:"/jobs", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("jobs"), 
            name: "jobList"
        }
        , {
            path: ":id", 
            component: e("job_details"), 
            name: "jobDetails", 
            props: !0
        }]
    }, {
        path:"/noticeboard", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("noticeboard"), 
            name: "noticeboard"
        }, {
            path: ":id", 
            component: e("noticeboard_details"), 
            name: "noticeboardDetails", 
            props: !0
        }]
    }, {
        path:"/hours", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("hours"), 
            name: "hourList"
        }]
    }, {
        path:"/directions", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("directions"), 
            name: "directions"
        }]
    }, {
        path:"/contact_us", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("contact_us"), 
            name: "contactUs"
        }]
    }, {
        path:"/leasing", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("leasing"), 
            name: "leasing"
        }]
    }, {
        path:"/newsletter", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("newsletter"), 
            name: "newsletter", 
            props: !0
        }]
    }, {
        path:"/pages", 
        component:e("default"), 
        redirect:"/404", 
        children:[ {
            path: ":id", 
            component: e("page_details"), 
            name: "pageDetails", 
            props: !0
        }]
    }, {
        path:"/website_support", 
        component:e("default"), 
        children:[ {
            path: "", 
            component: e("website_support"), 
            name: "websiteSupport"
        }]
    }, {
        path:"/thank_you", 
        component:e("default"), 
        redirect:"/404", 
        children:[ {
            path: "", 
            component: e("thank_you"), 
            name: "thankYou"
        }]
    }, {
        path:"/search-results", 
        component:e("default"), 
        children:[ {
            path:"", 
            component:e("search_results"), 
            meta: {
                pageName: "Search Results"
            }, 
            name:"search-results"
        }]
    }, {
        path: "/404", 
        name: "404", 
        component: e("notfoundcomponent")
    }, {
        path: "*", redirect: "/"
    }]
}

);