

<!-- Start lib/simba.js -->



## 
```
                   ,   __, ,
   _.._         )\/(,-' (-' `.__
  /_   `-.      )'_      ` _  (_    _.---._
 // \     `-. ,'   `-.    _\`.  `.,'   ,--.\
// -.\       `        `.  \`.   `/   ,'   ||
|| _ `\_         ___    )  )     \  /,-'  ||
||  `---\      ,'__ \   `,' ,--.  \/---. //
 \\  .---`.   / /  | |      |,-.\ |`-._ //
  `..___.'|   \ |,-| |      |_  )||\___//
    `.____/    \\\O| |      \o)// |____/
         /      `---/        \-'  \
         |        ,'|,--._.--')    \
         \       /   `n     n'\    /
          `.   `&lt;   .::`-,-'::.) ,'
            `.   \-.____,^.   /,'
              `. ;`.,-V-.-.`v'
                \| \     ` \|\
                 ;  `-^---^-'/
                  `-.______,'
```








## Simba
Simba constructor

Simba is the container of Kiara.

If no parent is given, this Simba will be a root.




### Params: 

* **Simba** *parent* Parent containe, this parameter is optional. 




### Return:

* **Simba** The Simba






## add(name, value, description)
Add a new kiara





### Params: 

* **String** *name* Name of the kiara

* **mixed** *value* Value of the kiara

* **String** *description* Description of the kiara




### Return:

* **Kiara** The kiara






## children()
Return the Simba of the last added kiara







### Return:

* **Simba** Simba of the last added kiara






## end()
Return the parent of the Simba







### Return:

* **Simba** Parent of the Simba






## get()
Return the value from a key







### Return:

* **mixed|undefined** The value or undefined if no value exists






## set(The)
Set the value a kiara





### Params: 

* **mixed** *The* value to set




### Return:

* **Simba** The simba






## getConfig()
Return the config of the Simba







### Return:

* **Object** The config as json object






## setConfig(object)
Override the values of the Simba





### Params: 

* **Object** *object* The object




### Return:

* **Object** The overriden Simba





<!-- End lib/simba.js -->



<!-- Start lib/kiara.js -->



## Kiara
Kiara constructor

Kiara represent a configuration value.




### Params: 

* **Simba** *parent* Parent of the kiara

* **String** *name* Name of the kiara

* **mixed** *value* Value of the kiara

* **String** *description* Description of the kiara




### Return:

* **Kiara** The kiara






## getValue()
Return the value of the Kiara







### Return:

* **mixed** The value of the kiara






## setValue(The)
Set the value of the Kiara





### Params: 

* **mixed** *The* value to set




### Return:

* **Kiara** The kiara






## toJson()
Return the json representation of the kiara
If the Kiara contains other kiara, it will go recursively







### Return:

* **Object** The json representation of the kiara






## setConfig()
Override the values of the kiara
If the Kiara contains other kiara, it will go recursively







### Return:

* **Kiara** The kiara






## add()
Call parent.add function











## children()
Call parent.children function











## end()
Call parent.end function










<!-- End lib/kiara.js -->

