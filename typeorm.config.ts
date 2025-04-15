import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { join } from 'path';
import { Telemetry } from 'src/modules/telemtry/entities/telemetry';
import { UserCourseCertificate } from 'src/modules/certificate/entities/user_course_certificate';
import { AssessmentTracking } from 'src/modules/tracking_assessment/entities/tracking-assessment-entity';
import { AssessmentTrackingScoreDetail } from 'src/modules/tracking_assessment/entities/tracking-assessment-score-details-entity';
import { ContentTrackingDetail } from 'src/modules/tracking_content/entities/tracking-content-details-entity';
import { ContentTracking } from 'src/modules/tracking_content/entities/tracking-content-entity';
dotenv.config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  database: configService.get('POSTGRES_DATABASE'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  entities: [
    UserCourseCertificate,
    AssessmentTracking,
    AssessmentTrackingScoreDetail,
    ContentTracking,
    ContentTrackingDetail
  ],
  migrations: [join(__dirname, 'migrations', '*.ts')], // Note: .ts for development
  synchronize: true,
});
