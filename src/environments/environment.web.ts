declare let __environment: any;

export const environment = {
	production: Boolean(__environment.production),
	bfeBackendBaseUrl: __environment.bfeBackendBaseUrl,
};
