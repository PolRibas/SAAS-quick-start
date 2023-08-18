import { MessagesErrors } from "../../../types";

export const errorMessages: MessagesErrors = {
  'error-401': 'Unauthorized',
  'error-402': 'Payment Required',
  'error-403': 'Forbidden',
  'error-404': 'Not Found',
  'error-416': 'Range Not Satisfiable',
  'error-500': 'Internal Server Error',
  'error-503': 'Service Unavailable',
  'error-504': 'Gateway Timeout',
  'error-505': 'HTTP Version Not Supported',
  'error-507': 'Insufficient Storage',
  'error-508': 'Loop Detected',
  'error-509': 'Bandwidth Limit Exceeded',
  'error-510': 'Not Extended',
  'error-511': 'Network Authentication Required',
  'error-512': 'Network Authentication Not Negotiable',
  'error-513': 'Invalid Host Request',
  'error-514': 'Invalid Upgrade Request',
  'invalid-email': 'Invalid email',
  'invalid-username': 'Invalid username',
  'invalid-phone-number': 'Invalid phone number',
  'min-length-3': 'Minimum 3 characters',
  'invalid-password': 'Invalid password',
  'invalid-password-confirmation': 'Invalid password confirmation',
  'invalid-company-name': 'Invalid company name',
  'error-many-item': 'There is some error in this item',
}
