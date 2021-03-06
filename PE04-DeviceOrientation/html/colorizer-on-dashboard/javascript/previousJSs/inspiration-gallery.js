// The self-calling function helps to prevent variables from leaking into
// the global scope. This way we can avoid overwriting already existing
// variables and functions.
(function() {

  /**
   * Loads data representing a photo album from an external service.
   *
   * Usually modern web application load their data from external sources, so
   * called `Application Programming Interfaces` (API). These interfaces
   * provide structural data via a specific resource URL, which can be loaded
   * (amoung others) by frontend applications. Generally those data
   * structures are loaded via a Content Management System (CMS) from a
   * database. In addition popular services like Twitter, Dribbble or Flickr
   * provide a APIs to their resources, which allows developers to integrate
   * data from these services into their own products.
   *
   * For our application we load some dummy content which represent an image
   * gallery with 50 images. The service we use is named
   * [JSONPlaceholder](http://jsonplaceholder.typicode.com/). Each image
   * object in the retrieved collection consists of five properties, amoung
   * others the url to an image resource:
   *
   * EXAMPLE:
   * var daten = [
   *   {
   *     albumId: 1,
   *     id: 1,
   *     title: 'accusamus beatae ad facilis cum similique qui sunt',
   *     url: 'http://placehold.it/600/92c952',
   *     thumbnailUrl: 'http://placehold.it/150/30ac17'
   *   },
   *   {
   *     albumId: 1,
   *     id: 2,
   *     title: 'reprehenderit est deserunt velit ipsam',
   *     url: 'http://placehold.it/600/771796',
   *     thumbnailUrl: 'http://placehold.it/150/dff9f6'
   *   },
   *   // etc...
   * ];
   *
   * NOTE:
   * This function requests the data from the external service in a
   * synchronous fashion to reduce the overall complexity of the script. Note
   * that this is a depreciated feature which might be removed in upcoming
   * browser versions. In future lessons you learn how to peform a proper
   * asynchronous request which helps to improve the performance of our
   * component.
   *
   * @param   {Number}  ID of the album to load.
   * @return  {Array}   List of album images.
   */
  function loadPhotoAlbum( albumId ) {
    var request = new XMLHttpRequest();
    request.open( 'GET', 'http://jsonplaceholder.typicode.com/albums/' + albumId + '/photos', false );
    request.send();
    return JSON.parse( request.responseText );
  }

  // Save a reference to the document element that should contain all
  // randomly selected images.
  var albumElement = document.querySelector('.js-album-item-list');

  // Save a reference to the button which will trigger our randomizer
  // process.
  var buttonElement = document.querySelector('.js-album-random');

  // Load the image data of the photo album with the ID 1 from the external
  // service.
  var photoAlbum = loadPhotoAlbum( 1 );

  /**
   * Generate a random number between zero and `limit`.
   *
   * @param   {Number}  limit  The largest number to retrieve.
   * @return  {Number}
   */
  function generateRandomNumber( limit ) {
    var num = Math.random() * limit;
    num = Math.floor( num );
    return num;
  }

  /**
   * Display a given number of random images from the currently loaded album.
   *
   * @param   {Number}  count  Number of images to display.
   */
  function insertRandomAlbumImages( count ) {

    // Determine the total number of images available in the album
    var numAlbumImages = photoAlbum.length;

    for ( var i = 0; i < count; i++ ) {

      // Generate a random number which is between 0 and the total number of
      // album images (= 50, in our example).
      var randomNumber = generateRandomNumber( numAlbumImages );

      // Retrieve the album image defined at the given index position of
      // the array.
      var albumImage = photoAlbum[ randomNumber ];

      // Add the selected album image to the document.
      insertAlbumImage( albumImage );

    }
  }

  /**
   * Create and insert a new image element into the document.
   *
   * @param   {Object}  image  Album image to create a document node for.
   * @return  {Element}        Reference to the element created.
   */
  function insertAlbumImage( image ) {

    // Create a container which will contain image and caption. We use the
    // figure-tag, which was added with HTML5.
    var containerElement = document.createElement('figure');
    containerElement.classList.add('album-item');

    // We will display the thumbnail images and link them to the full image.
    // This way we can load images with a smaller file size, but allow users
    // to display the image in full resolution.
    var anchorElement = document.createElement('a');
    anchorElement.setAttribute( 'href', image.url );
    anchorElement.classList.add('album-item__img');

    // Create the image element and assign a value for the source attribute.
    var imageElement = document.createElement('img');
    imageElement.src = image.thumbnailUrl;

    // Create a caption for the image element using the figcaption-tag which
    // was introduced with HTML5 as well.
    var captionElement = document.createElement('figcaption');
    captionElement.textContent = image.title;
    captionElement.classList.add('album-item__caption');

    // BONUS TASK: Create a button element that allows users to change an
    // individual image.
    var imageButtonElement = document.createElement('button');
    imageButtonElement.classList.add('btn');
    imageButtonElement.textContent = 'Switch image';
    captionElement.appendChild( imageButtonElement );

    // BONUS TASK: Register a custom event handler which will switch the
    // current element with another one.
    imageButtonElement.addEventListener( 'click', handleSwitchImageButtonClick );

    // Create the node hierarchy and add the elements to the document. The
    // generated element will look like this:
    // <figure class="album-item">
    //   <a href="..." class="album-item__img">
    //     <img src="...">
    //   </a>
    //   <figcaption class="album-item__caption">...</figcaption>
    // </figure>
    anchorElement.appendChild( imageElement );
    containerElement.appendChild( anchorElement );
    containerElement.appendChild( captionElement );
    albumElement.appendChild( containerElement );

  }

  /**
   * BONUS TASK: Event handler that is triggered once the user clicks on the
   * button to switch an album image.
   *
   * @param   {Event}  e  Event arguments.
   */
  function handleSwitchImageButtonClick( e ) {

    // Determine which element is currently clicked
    var imageButtonElement = e.target;                            // <button>
    var albumImageCaptionElement = imageButtonElement.parentNode; // <figcaption>
    var albumImageElement = albumImageCaptionElement.parentNode;  // <figure>

    // Remove the switched element from the document
    albumElement.removeChild( albumImageElement );

    // Select and insert a new random image from the image array.
    insertRandomAlbumImages( 1 );

    // Prevent default behavior of the click event
    e.preventDefault();

  }

  /**
   * Event handler that is triggered once the user presses the
   * component button.
   *
   * @param   {Event}  e  Event arguments.
   */
  function handleRandomButtonClick( e ) {

    // Delete old contents added to the album first. Not very efficient, but
    // good enough for now.
    albumElement.innerHTML = '';

    // Insert three new random images into the document.
    insertRandomAlbumImages( 3 );

    // Prevent the default behavior of the click event
    e.preventDefault();

  }

  // Display three random images once the scrip loads.
  insertRandomAlbumImages(3);

  // Register the event handler for the click event on the component button
  buttonElement.addEventListener( 'click', handleRandomButtonClick );

})();
