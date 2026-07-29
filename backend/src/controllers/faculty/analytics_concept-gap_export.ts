import { Request, NextResponse } from 'next/server';

import { handleError } from '../../lib/errors';
import { AnalyticsService } from '../../modules/faculty/analytics/analytics.service';
import { conceptGapQuerySchema } from '../../modules/faculty/analytics/analytics.validation';

export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const searchParams = Object.fromEntries(req.nextUrl.searchParams);
    const query = conceptGapQuerySchema.parse(searchParams);
    
    const csvContent = await AnalyticsService.exportConceptGapCSV(user.id, query);

    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', 'attachment; filename="concept_gap_analysis.csv"');

    return new NextResponse(csvContent, {
      status: 200,
      headers,
    });
  } catch (error) {
    handleError(error, res);
  }
}
