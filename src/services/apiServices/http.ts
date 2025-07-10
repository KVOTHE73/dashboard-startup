import axios from "axios";

/**
 * Realiza una solicitud GET a un endpoint especificado.
 *
 * @param endpoint - El endpoint al que se enviará la solicitud.
 * @param token - El token de autenticación que se incluirá en los encabezados.
 * @param params - Un objeto con los parámetros que se enviarán en la URL.
 *
 * @returns Una Promesa que se resuelve con los datos de la respuesta o se rechaza con un mensaje de error.
 *
 * @throws Lanza un mensaje de error si la solicitud falla o encuentra un problema.
 */
export async function fetchGetData<T>(
  endpoint: string,
  token: string,
  params?: Record<string, any>
): Promise<T> {
  const lang = localStorage.getItem("language");
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
    },
    params,
  };

  try {
    const response = await axios.get(endpoint, config);
    return response.data as T;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

/**
 * Realiza una solicitud POST y obtiene datos de un endpoint especificado utilizando el token y los datos proporcionados.
 *
 * @param endpoint - El endpoint de la API al que se enviará la solicitud.
 * @param token - El token de autenticación que se incluirá en los encabezados de la solicitud.
 * @param data - Los datos que se enviarán en el cuerpo de la solicitud.
 *
 * @returns Una Promesa que se resuelve con los datos de la respuesta o se rechaza con un mensaje de error.
 *
 * @throws Lanza un mensaje de error si la solicitud falla o encuentra un problema.
 */
export async function fetchPostData<T>(
  endpoint: string,
  token: string,
  data: any
): Promise<T> {
  const lang = localStorage.getItem("language");
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
      "Accept-Language": lang,
    },
  };

  try {
    const response = await axios.post(endpoint, data, config);
    return response.data as T;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

/**
 * Gestiona y formatea los errores provenientes de solicitudes HTTP realizadas con Axios.
 *
 * @param error - El objeto de error capturado de una solicitud de Axios. Puede ser de tipo AxiosError o cualquier otro error.
 * @returns Un mensaje en formato de cadena que describe el error. Puede ser:
 *          - El mensaje de error de la respuesta del servidor.
 *          - Un mensaje de error formateado con el código de estado HTTP.
 *          - Un mensaje indicando que no se recibió respuesta.
 *          - El mensaje de la propiedad `message` si es un objeto de tipo Error estándar.
 *          - Un mensaje genérico de "error inesperado" para cualquier otro tipo de error.
 */
export function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        error.response.data.message ||
        `Código ${error.response.status}: Error desconocido.`
      );
    } else if (error.request) {
      return "No se recibió respuesta del servidor.";
    }
  }
  return error instanceof Error ? error.message : "Error inesperado.";
}
