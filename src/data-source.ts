import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { UserCourseCertificate } from './modules/certificate/entities/user_course_certificate';
import { AssessmentTracking } from './modules/tracking_assessment/entities/tracking-assessment-entity';
import { AssessmentTrackingScoreDetail } from './modules/tracking_assessment/entities/tracking-assessment-score-details-entity';
import { ContentTrackingDetail } from './modules/tracking_content/entities/tracking-content-details-entity';
import { ContentTracking } from './modules/tracking_content/entities/tracking-content-entity';

// Load .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [
    UserCourseCertificate,
    AssessmentTracking,
    AssessmentTrackingScoreDetail,
    ContentTracking,
    ContentTrackingDetail,
  ],
  migrations: [join(__dirname, 'migrations', '*.ts')], // dev
  synchronize: true,
  logging: true,
});
