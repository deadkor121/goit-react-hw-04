
import react from '@vitejs/plugin-react';

export default {
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      'react-modal': 'react-modal' 
    }
  }
};
