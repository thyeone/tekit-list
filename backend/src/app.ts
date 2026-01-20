import { ModuleMetadata } from '@nestjs/common';

export class App {
  imports: ModuleMetadata['imports'] = [];
  controllers: ModuleMetadata['controllers'] = [];
  providers: ModuleMetadata['providers'] = [];
  exports: ModuleMetadata['exports'] = [];
}
