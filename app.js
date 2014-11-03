    //<debug>
Ext.Loader.setPath({
    'Ext': 'src'
});
//</debug>



/**
 * This is a simple example that demonstrates the Ext.TabPanel component.
 *
 * It will simply create a Ext.tab.Panel component with three children and add it to the viewport.
 */
Ext.application({
    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },

    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },

    //next we require any components we are using in our application.
    requires: [
        'Ext.tab.Panel',
        'Ext.form.*',
        'Ext.field.*',
        'Ext.data.*'
    ],

    /**
     * The launch function is called when the browser and the framework is ready
     * for the application to launch.
     *
     * All we are going to do is create a simple tabpanel with 3 items, and add
     * it to the global Ext.Viewport instance.
     */
        launch: function() {
		        //first we define each of the categories we have for each one of the horixontal carousels
        //these images can be found inside resources/photos/{category_name}/*
        var categories = ['Food', 'Animals', 'Cars', 'Architecture'],
            itemsCountPerCategory = 10,
            horizontalCarousels = [],
            items, i, j, ln, category;

        //now we loop through each of the categories
        for (i = 0,ln = categories.length; i < ln; i++) {
            items = [];
            category = categories[i];

            for (j = 1; j <= itemsCountPerCategory; j++) {
                //and push each of the image as an item into the items array
                //you can see we are using the img xtype which is an image component,
                //and we just give is a custom cls to style it, and the src
                //of the image
                items.push({
                    xtype: 'image',
                    cls: 'my-carousel-item-img',
                    src: 'resources/photos/' + category + '/' + j + '.jpg'
                });
            }

            //now we add the new horizontal carousel for this category
            horizontalCarousels.push({
                xtype: 'carousel',

                //the direction is horizontal
                direction: 'horizontal',

                //we turn on direction lock so you cannot scroll diagonally
                directionLock: true,

                //and give it the items array
                items: items
            });
		
     }
		
		
		
		
        //we send a config block into the Ext.Viewport.add method which will
        //create our tabpanel
        Ext.Viewport.add({
            //first we define the xtype, which is tabpanel for the Tab Panel component
            xtype: 'tabpanel',

            //next we define the items that will appear inside our tab panel
            items: [
                {
                    //each item in a tabpanel requires the title configuration. this is displayed
                    //on the tab for this item
					 title: 'Home',
                     iconCls: 'home',
                    cls: 'home',
                    scrollable: true,
                    //next we give it some simple html
                    items: {
                        html: "<div class='title'>Shotechs Mobile Apps</div><div class='shoimg'><img src='images/s1.jpg'  alt='shotechs'/> </div>  </br><div class='par'>Only on <img src='images/amazonSm.jpg' alt='amazon'/></div> ",
                        centered: true
                    },

                    //then a custom cls so we can style it
                    cls: 'card1'
                },
                {
                    //title
                    title: 'Galley',
 iconCls: 'more',
            xtype: 'carousel',

            bufferSize: 2,

            //this time direction vertical
            direction: 'vertical',

            //and the horizontalCarousels array
            items: horizontalCarousels,
           
			
                    //custom cls
                    cls: 'card2'
                },
                // This is the contact page, which features a form and a button. The button submits the form
                {
                    xtype: 'formpanel',
                    title: 'Contact Us',
                    iconCls: 'user',
                    url: 'contact.php',
                    layout: 'hbox',

                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Contact Us',
                            instructions: 'Email address is optional',

                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Name',
                                    name: 'name'
                                },
                                {
                                    xtype: 'emailfield',
                                    label: 'Email',
                                    name: 'email'
                                },
                                {
                                    xtype: 'textareafield',
                                    label: 'Message',
                                    name: 'message',
                                    height: 90
                                },

{ html: " </br> "},
                        

                                                        {
                            xtype: 'button',
                            text: 'Send',
                            ui: 'confirm',

                            // The handler is called when the button is tapped
                            handler: function() {

                                // This looks up the items stack above, getting a reference to the first form it see
                                var form = this.up('formpanel');

                                // Sends an AJAX request with the form data to the url specified above (contact.php).
                                // The success callback is called if we get a non-error response from the server
                                form.submit({
                                    success: function() {
                                        // The callback function is run when the user taps the 'ok' button
                                        Ext.Msg.alert('Thank You', 'Your message has been received', function() {
                                            form.reset();
                                        });
                                    }
                                });
                            }
                        }
                            ]
                        },

                    ]
                }
            ]
        });
    }
});
