(function(outputField) {

  // ###################################################################################
  // OUTPUT
  // ###################################################################################
    function output() {
        var node = document.createElement('p');
        if (arguments.length) {
            node.innerHTML = [].join.call(arguments, ' : ');
        } else {
            node.innerHTML = '#####################################';
        }
        outputField.appendChild(node);
    }

    // ###################################################################################
    // Learning inheritance
    // ###################################################################################

    // Person
    function Person(name) {
        this.name = name;
    }

    Person.prototype.dance = function() {
        output(this.name + ' is dancing!');
    };

    Person.prototype.kill = function() {
        output(this.name + ' murdered someone!');
    };

    Person.prototype.mistake = function(msg) {
      output(this.name + ' ' + msg );
    };

    // Doctor
    function Doctor(name, experienced) {
        this.name = name;
        this.experienced = experienced;

        this.mistake = function(msg){
          if ( this.experienced && !msg ){
            this.mistake( '\'s patient is angry!');
          } else if ( !this.experienced && !msg ){
            this.mistake( '\'s patient died!');
          } else if ( typeof msg ===  'string' ){
            this.mistake(arguments);
          }
        };
    }

    // Doctor extends Person
    Doctor.prototype = new Person();

    // restore original constructor
    // so instances based on Doctor and not Person
    // Object.defineProperty(Doctor.prototype, "constructor", {
    //     enumerable: false,
    //     value: Doctor,
    //     writable: true
    // });

    Doctor.prototype.heal = function() {
        output(this.name, 'healed someone <b><i>as a Doctor!</i></b>');
    };

    // add Static function
    Object.defineProperty(Doctor, "heal", {
        configurable: false,
        enumerable: false,
        value: function() {
            output(this.name, 'healed someone <b><i>like a doctor</i></b>!');
        },
        writable: true
    });

    var lisa = new Doctor('Lisa', false);
    output('<h3 style="display:inline">Lisa is a Doctor</h3>', 'Doctor = ' + String(lisa instanceof Doctor));
    output('<h3 style="display:inline">Lisa is also a Person</h3>', 'Person = ' + String(lisa instanceof Person));
    output('<h3 style="display:inline">Doctors can dance because they are people</h3>');
    lisa.dance();
    output();


    output('<h3 style="display:inline">Doctors can heal</h3>');
    lisa.heal();

    output('<h3 style="display:inline">Call Super</h3>');
    output('<h3 style="display:inline">Lisa in not an experienced doctor and makes a mistake</h3> Experienced', lisa.experienced);
    lisa.mistake();

    lisa.experienced = true;
    output('<h3 style="display:inline">Lisa is experienced but still makes a mistake</h3>' + ' Experienced', lisa.experienced);
    lisa.mistake();
    output('<h3 style="display:inline">Lisa makes a non medical mistake</h3>');
    lisa.mistake('cries out "what a bummer!"');


    output();
    output('<h3>Call Object Static Function</h3>');
    var tom = new Person('Tom');
    output('<h3 style="display:inline">Tom is a Person</h3>', 'Person = ' + String(tom instanceof Person));
    output('<h3 style="display:inline">Tom is not a Doctor</h3>', 'Doctor = ' + String(tom instanceof Doctor));
    output('<h3>Tom can heal by using the same method a doctor does</h3>');
    Doctor.heal.call(tom);
    output('<h3>Tom inpersonates a doctor by using the same method as Lisa does to heal someone</h3>');
    lisa.heal.call(tom);
    output('<h3 style="display:inline">Tom is so happy that he starts dancing</h3>');
    tom.dance();
    output('<h3>Tom\'s mistakes are different than a doctor\'s mistakes</h3>');
    tom.mistake('put plastic in the paper trash!');

    var dick = new Person('Dick');
    output('<h3 style="display:inline">Dick is a Person</h3>', 'Person = ' + String(dick instanceof Person));
    output('<h3>Dick can kill</h3>');
    dick.kill();
    output('<h3>Lisa, a doctor, can kill the same way a person does</h3>');
    lisa.kill();



    output();
    output('<h3>Enumerable properties Lisa</h3>');
    for (var thisProp in lisa) {
        output(thisProp);
    }

    output();
    output('<h3>Enumerable properties Tom</h3>');
    for (var thisProp in tom) {
        output(thisProp);
    }

    output();
    output('<h3>Enumerable properties Doctor</h3>');
    for (var thisProp in Doctor) {
        output(thisProp);
    }







}(document.getElementById('output')));
