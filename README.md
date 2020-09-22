# Document Layout Analysis App
Simple docker deployment of document layout analysis using detectron2. Trained on Publaynet dataset.

### Backend is built in Flask
### Frontend is built in React

### Steps to build
* Download pre-trained model refered in https://github.com/hpanwar08/detectron2  (default Resnet101 model can be downloaded from [MaskRCNN Resnet101 FPN 3X](https://www.dropbox.com/sh/wgt9skz67usliei/AAD9n6qbsyMz1Y3CwpZpHXCpa?dl=0) )
* Copy the downloaded model in `backend` folder
* Download config yaml refered in https://github.com/hpanwar08/detectron2  (default Resnet101 config yaml is already present in `backend` folder)
* Copy the downloaded config yaml in `backend` folder
* Update the `model_config.yaml` file with model file name and config yaml file name (not required if using default values)
* Run `docker-compose up --build` from the parent folder
* Type `localhost:3000` in browser and upload and image

Note: It takes time to build the image

| <img src="assets/images/1.jpg" width=400> | <img src="assets/images/2.jpg" width=400> |
|---------------------------------------------------------------------------|---------------------------------------------------------------------------|

