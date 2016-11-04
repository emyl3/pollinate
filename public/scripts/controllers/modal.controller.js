app.controller('ModalController', ModalController);

function ModalController ($uibModalInstance) {
    var ctrl = this;
    ctrl.close = function () {
                 $uibModalInstance.close();
               };
    console.log('modal controller loaded');
}
