// errorModalPlugin.js
import { createApp, h } from 'vue';
import ErrorModal from '../utils/ErrorModal.vue';

export default {
  install(app) {
    app.config.globalProperties.$showErrorModal = function (message) {
      const modalApp = createApp({
        render() {
          return h(ErrorModal, { message });
        }
      });

      const div = document.createElement('div');
      document.body.appendChild(div);

      const vm = modalApp.mount(div);

      const modalElement = div.querySelector('.modal');
      const bootstrapModal = new bootstrap.Modal(modalElement);

      bootstrapModal.show();

      modalElement.addEventListener('hidden.bs.modal', () => {
        modalApp.unmount();
        document.body.removeChild(div);
      });
    };
  }
};
