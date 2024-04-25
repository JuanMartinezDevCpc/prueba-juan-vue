import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
    const middleware = to.meta && to.meta.middleware;
    const isCallableMiddleware = typeof middleware === 'function';
    if (isCallableMiddleware) {
      try {
        await middleware(to, from, next);
      } catch (error) {
        console.error(error);
        next(error);
      }
    } else {
      next();
    }
  });

  export default router;