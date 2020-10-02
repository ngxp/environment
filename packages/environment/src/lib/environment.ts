import { InjectionToken } from '@angular/core';

export const ENVIRONMENT = new InjectionToken('ENVIRONMENT_TOKEN');

export const environmentStorageKey = '__NGXP__ENVIRONMENT';

export async function fetchEnvironment<T extends unknown>(path = `${window.location.protocol}//${window.location.host}/environment`): Promise<T> {
  const response = await fetch(path);
  const env = await response.json();
  window.localStorage.setItem(environmentStorageKey, JSON.stringify(env));
  return env;
}
