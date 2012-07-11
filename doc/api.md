

<!-- Start lib/simba.js -->



## Simba
Simba constructor
If no parent is given, this Simba will be a root.




### Params: 

* **Simba** *parent* Parent containe, this parameter is optional. 




### Return:

* **Simba** The Simba






## add(name, type, value, required, description)
Add a new item

---



### Params: 

* **String** *name* Name of the item

* **Function** *type* Type of the item (String, Boolean, Function, Number, Object)

* **mixed** *value* Value of the item

* **Boolean** *required* True if item value is required

* **String** *description* Description of the item




### Return:

* **Item** The item






## children()
Return the Simba of the last added item

---





### Return:

* **Simba** Simba of the last added item





## end
Return the parent of the Simba






### Return:

* **Simba** Parent of the Simba






## get()
Return the value from a key

---





### Return:

* **mixed|undefined** The value or undefined if no value exists





## getConfig
Return the config of the Simba






### Return:

* **Object** The config as json object






## overrideValues(object)
Override the values of the Simba

---



### Params: 

* **Object** *object* The object




### Return:

* **Object** The overriden Simba





<!-- End lib/simba.js -->

