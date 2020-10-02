import { InjectionToken } from '@angular/core';

export const ENVIRONMENT = new InjectionToken('__NGXP_ENVIRONMENT_TOKEN');

export async function fetchEnvironment<T extends unknown>(path = `${window.location.protocol}//${window.location.host}/environment`): Promise<T> {
  const response = await fetch(path);
  const env = await response.json();
  return env;
}
