"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_img_cropper_1 = require("ng2-img-cropper");
var ImageCropComponent = (function () {
    function ImageCropComponent() {
        this.imageCropped = new core_1.EventEmitter();
        this.name = 'Angular2';
        this.cropperSettings = new ng2_img_cropper_1.CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;
        this.cropperSettings.canvasWidth = 200;
        this.cropperSettings.canvasHeight = 200;
        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.rounded = false;
        this.data1 = {};
    }
    ImageCropComponent.prototype.setRoundedMethod = function (value) {
        this.cropperSettings.rounded = value;
    };
    ImageCropComponent.prototype.cropped = function (bounds) {
        console.log(bounds);
        this.image = this.data1.image;
        this.imageCropped.emit(this.image);
    };
    ImageCropComponent.prototype.fileChangeListener = function ($event) {
        var image = new Image();
        var file = $event.target.files[0];
        var myReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(file);
    };
    ImageCropComponent.prototype.ngOnInit = function () {
    };
    return ImageCropComponent;
}());
__decorate([
    core_1.Input()
], ImageCropComponent.prototype, "image", void 0);
__decorate([
    core_1.Output()
], ImageCropComponent.prototype, "imageCropped", void 0);
__decorate([
    core_1.ViewChild('cropper', undefined)
], ImageCropComponent.prototype, "cropper", void 0);
ImageCropComponent = __decorate([
    core_1.Component({
        selector: 'app-image-crop',
        templateUrl: './image-crop.component.html',
        styleUrls: ['./image-crop.component.scss']
    })
], ImageCropComponent);
exports.ImageCropComponent = ImageCropComponent;
