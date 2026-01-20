import 'dotenv/config'
import path from 'node:path'
import { generateApi } from 'swagger-typescript-api'
;(async () => {
  await generateApi({
    fileName: 'api_sdk.ts',
    input: '../backend/swagger.json',
    output: path.resolve(process.cwd(), './codegen/__generated__'),
    extractRequestBody: true,
    extractResponseBody: true,
    extractEnums: true,
    extractRequestParams: true,
    unwrapResponseData: true,
    generateRouteTypes: false,
    extractResponseError: true,
    generateUnionEnums: true,
  })
})()
