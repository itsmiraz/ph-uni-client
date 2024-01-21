import { TItemsProps, TRoute } from "../types/types";

export const RouteGeneretor = (items: TItemsProps[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.element && item.path) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach(child => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);
  return routes;
};
