import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Note: In a real app, you would register Korean fonts here
// Font.register({ family: 'NotoSerifKR', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#F4F1EA',
    fontFamily: 'Helvetica', // Fallback for now
    color: '#2C2C2C',
  },
  header: {
    marginBottom: 40,
    textAlign: 'center',
    borderBottom: '1pt solid rgba(44, 44, 44, 0.1)',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 10,
    opacity: 0.6,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 15,
    borderBottom: '1pt solid rgba(44, 44, 44, 0.05)',
    paddingBottom: 5,
  },
  content: {
    fontSize: 11,
    lineHeight: 1.6,
    opacity: 0.8,
  },
  pillarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
  },
  pillar: {
    width: '22%',
    padding: 10,
    border: '1pt solid rgba(44, 44, 44, 0.1)',
    textAlign: 'center',
  },
  pillarText: {
    fontSize: 18,
    marginBottom: 5,
  },
  pillarLabel: {
    fontSize: 8,
    opacity: 0.4,
  },
  stamp: {
    position: 'absolute',
    bottom: 60,
    right: 60,
    border: '2pt solid #B22222',
    color: '#B22222',
    padding: 8,
    fontSize: 10,
    transform: 'rotate(-5deg)',
    opacity: 0.8,
  }
});

export const DocentReportPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Docent Report</Text>
        <Text style={styles.title}>본연의 풍경 (Nature's Landscape)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>[ 만세력 명식 ]</Text>
        <View style={styles.pillarContainer}>
          {data.pillars.map((p: any, i: number) => (
            <View key={i} style={styles.pillar}>
              <Text style={styles.pillarText}>{p.hanja}</Text>
              <Text style={styles.pillarLabel}>{i === 0 ? "년" : i === 1 ? "월" : i === 2 ? "일" : "시"}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>[ 결의 해석 ]</Text>
        <Text style={styles.content}>
          귀하의 타고난 기운은 {data.dayMaster}의 성질을 띠고 있습니다. 
          이는 만물 중에서도 가장 중심이 되는 기운으로, 삶의 여정에서 귀하가 나침반처럼 흔들리지 않고 
          나아갈 수 있는 원동력이 됩니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>[ 도슨트의 주석 ]</Text>
        <Text style={styles.content}>
          본 리포트는 귀하의 생년월일시를 기반으로 도출된 고유의 에너지 패턴을 분석한 결과입니다. 
          천명갤러리는 귀하의 운명이 하나의 예술 작품으로 완성되기를 기원합니다.
        </Text>
      </View>

      <View style={styles.stamp}>
        <Text>天命 GALLERY 認</Text>
      </View>
    </Page>
  </Document>
);
