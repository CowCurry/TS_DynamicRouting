import { DynamicRoute } from './types';

type Route1 = '/blog/[slug]/page.js';
type Params1 = DynamicRoute<Route1>;

type Route2 = '/shop/[...slug]/page.js';
type Params2 = DynamicRoute<Route2>;

type Route3 = '/app/[...foo]/[...bar]';
type Params3 = DynamicRoute<Route3>;
