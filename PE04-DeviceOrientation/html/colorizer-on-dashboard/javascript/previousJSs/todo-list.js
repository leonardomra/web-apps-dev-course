// The self-calling function helps to prevent variables from leaking into
// the global scope. This way we can avoid overwriting already existing
// variables and functions.
(function() {

  // Save a reference to the submission form.
  var formElement = document.querySelector('.js-task-add');

  // Save a reference to the text input field, which makes it easier to
  // retrieve the current value.
  var inputElement = document.querySelector('.js-task-input');

  // Save a reference to the unordered list in the document. We will use
  // this node as parent node for all our todo list items.
  var listElement = document.querySelector('.js-task-list');

  // Collection holding each individual task of the current user
  var tasks = [];

  /**
   * Add a new task to the collection.
   *
   * @param  {string}  desc  [description]
   */
  function addTask( desc ) {

    // Create a new object with properties describing a task
    var task = {
      description: desc,
      isDone: false,
      element: null,
    };

    // Add the new object to the global collection of tasks
    tasks.push( task );

    // Return the created task object
    return task;

  }

  /**
   * Creates a new document node representing an individual task.
   *
   * @param   {Object}  task  The task that should be added to the document.
   * @return  {Element}       The node added to the document.
   */
  function insertListElement( task ) {

    // Create a new document node.
    var element = document.createElement('li');

    // Assign the content that should be visible in the document.
    element.textContent = task.description;

    // Assign a custom class, which we can use within our css stylesheet.
    element.classList.add('task');

    // If the task is already done, use css to change its visual appearance.
    if ( task.isDone ) {
      element.classList.add('is-done');
    }

    // BONUS TASK: Register a custom event handler which will be called once
    // the user clicks on the list item.
    element.addEventListener( 'click', handleElementClick );

    // Add the new list item element to the document. Better said: add the
    // element as child element of the unordered list.
    listElement.appendChild( element );

    // BONUS TASK: To make it easier for us to manipulate a list item, once
    // the user clicks on it, we save a reference to the document node as a
    // property on the task object.
    task.element = element;

    // Return the created document element.
    return element;

  }

  /**
   * A helper function for you to retrieve the text the user has entered
   * in the form field.
   *
   * @return  {string}  The current value of the textfield.
   */
  function getUserInput() {
    return inputElement.value;
  }

  /**
   *  A helper function to clear the input of the textfield.
   */
  function clearUserInput() {
    inputElement.value = '';
  }

  /**
   * BONUS TASK: Find a task object in the global array by the document
   * element representing a task.
   *
   * @param   {Element}  element  Document element representing the task.
   *
   * @return  {Object|Boolean}
   */
  function findTaskByElement( element ) {

    for ( var i = 0, l = tasks.length; i < l; i++ ) {
      var task = tasks[i];
      if ( task.element === element ) {
        return task;
      }
    }

    return false;

  }

  /**
   * BONUS TASK: Event handler which will be called once the user clicks
   * on an individual list item.
   *
   * @param   {Event}  e  Event object.
   */
  function handleElementClick( e ) {

    // We can access the list item clicked by the user via the properties
    // of the event object. Thank you JavaScript :)...
    var elementClicked = e.target;

    // Search in our global array of task objects for an entry, that has the
    // given element assigned as property value.
    var task = findTaskByElement( elementClicked );

    // If the task is already done, change its state to undone.
    if ( task.isDone ) {
      task.isDone = false;
      elementClicked.classList.remove('is-done');
    }

    // If the task is not already done, change its state to done.
    else {
      task.isDone = true;
      elementClicked.classList.add('is-done');
    }

    // TIPP: You could simplify the previous lines by writing:
    // task.isDone = !task.isDone;
    // elementClicked.classList.toggle('is-done');

    // To see the changes on the task object and the global array, we use
    // the log-method.
    console.log( task, tasks );

  }

  /**
   * Event handler which will be called once the user submits the contents
   * of the component form.
   *
   * @param   {Event}  e  Event object.
   */
  function handleFormSubmission( e ) {

    // Retrieve the text the user has entered in the textfield
    var input = getUserInput();

    // Only create a new task, if the text entered is not empty
    if ( input.length > 0 ) {

      // Add a new task object to the global array.
      var task = addTask( input );

      // Add a new list item node to the document tree.
      var element = insertListElement( task );

      // Clear the text entered in the textfield, so the user can start
      // entering a new task.
      clearUserInput();

    }

    // Prevent the browser from performing its default actions
    e.preventDefault();

  }

  // Tell the browser that we would like to be notified, once the user tries
  // to submit our custom form.
  formElement.addEventListener( 'submit', handleFormSubmission );

  // Create three initial tasks
  addTask( 'Mow the lawn' );
  addTask( 'Buy christmas presents' );
  addTask( 'Give JavaScript another chance' );

  // Add the initial tasks to the document tree.
  for ( var i = 0, l = tasks.length; i < l; i++ ) {

    // Access a specific task element from the global array.
    var task = tasks[ i ];

    // Create a new document node for the given task.
    var element = insertListElement( task );

  }

})();
