import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApplicationConfig } from '@project/file-config';
import { FileCoreModule } from '@project/file-core';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

@Module({
  imports: [
    FileCoreModule,
    ServeStaticModule.forRootAsync({
      useFactory: (applicationConfig: ConfigType<typeof ApplicationConfig>) => {
        const uploadPath = applicationConfig.uploadDirectoryPath;
        const serveRootPath = applicationConfig.serveRoot;
        return [{
          rootPath: uploadPath,
          serveRoot: serveRootPath,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      },
      inject: [ApplicationConfig.KEY]
    })
  ],
  controllers: [FileUploaderController],
  providers: [FileUploaderService]
})
export class FileUploaderModule {}
