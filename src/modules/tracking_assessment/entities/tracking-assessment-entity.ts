import { IsEnum, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EvaluationType {
  AI = 'AI Evaluator',
  ONLINE = 'Online',
  MANUAL = 'Manual',
}
@Entity({ name: 'assessment_tracking' })
export class AssessmentTracking {
  @PrimaryGeneratedColumn('uuid')
  assessmentTrackingId: string;

  @Column('uuid')
  userId: string;

  @Column()
  courseId: string;

  @Column()
  contentId: string;

  @Column()
  attemptId: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdOn: Date;

  // @Column()
  // grand_total: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastAttemptedOn: Date;

  @Column('jsonb')
  assessmentSummary: Record<string, any>;

  @Column('double precision')
  totalMaxScore: number;

  @Column('double precision')
  totalScore: number;

  @Column({ type: 'timestamp with time zone' })
  updatedOn: Date;

  @Column('numeric')
  timeSpent: number;

  @Column()
  unitId: string;

  @Column()
  showFlag: boolean;

  @IsOptional()
  @IsEnum(EvaluationType, {
    message: 'evaluatedBy must be one of: AI, Online, Manual',
  })
  evaluatedBy?: EvaluationType;
}
