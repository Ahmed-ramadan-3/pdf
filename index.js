const puppeteer = require('puppeteer');

// دمج HTML و CSS بالكامل داخل متغير واحد لتجنب مشاكل مسارات الملفات
const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>الدليل الدراسي الشامل - علم الإدارة</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #1e3a8a;
            --primary-light: #eff6ff;
            --secondary: #0d9488;
            --secondary-light: #ccfbf1;
            --accent: #d97706;
            --danger: #dc2626;
            --dark: #0f172a;
            --gray: #64748b;
            --light-bg: #f8fafc;
            --border: #e2e8f0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Tajawal', sans-serif; background-color: var(--light-bg); color: var(--dark); line-height: 1.7; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 16px; }
        header { text-align: center; border-bottom: 3px solid var(--primary); padding-bottom: 25px; margin-bottom: 30px; }
        header h1 { color: var(--primary); font-size: 28px; font-weight: 900; }
        header p { color: var(--gray); font-size: 16px; font-weight: 500; }
        .badge { display: inline-block; background: var(--primary-light); color: var(--primary); padding: 4px 12px; border-radius: 20px; font-weight: 700; margin-top: 10px; }
        .toc-box { background: var(--primary-light); border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px 25px; margin-bottom: 35px; }
        .toc-title { color: var(--primary); font-size: 20px; font-weight: 800; margin-bottom: 15px; }
        .toc-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; list-style: none; }
        .toc-list li a { color: var(--dark); text-decoration: none; font-weight: 500; }
        h2 { color: var(--primary); font-size: 22px; font-weight: 800; border-right: 5px solid var(--accent); padding-right: 12px; margin: 35px 0 20px 0; }
        h3 { color: var(--secondary); font-size: 18px; margin: 20px 0 10px 0; }
        .highlight-text { background-color: #fef08a; padding: 2px 6px; border-radius: 4px; font-weight: 700; }
        .callout { padding: 18px 20px; border-radius: 10px; margin: 20px 0; border-right: 4px solid; }
        .callout-info { background-color: var(--primary-light); border-color: var(--primary); }
        .callout-danger { background-color: #fee2e2; border-color: var(--danger); }
        .diagram-container { background: #ffffff; border: 2px dashed var(--border); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
        .workflow { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
        .wf-card { background: var(--primary); color: white; padding: 15px; border-radius: 10px; flex: 1; text-align: center; }
        .wf-arrow { color: var(--accent); font-weight: bold; font-size: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px 15px; text-align: right; border-bottom: 1px solid var(--border); }
        th { background-color: var(--primary); color: white; }
        tr:nth-child(even) { background-color: #f8fafc; }
        .qa-item { background: #ffffff; border: 1px solid var(--border); border-radius: 10px; padding: 18px; margin-bottom: 15px; }
        .qa-question { font-weight: 800; color: var(--primary); margin-bottom: 8px; }
        .qa-answer { border-right: 3px solid var(--secondary); padding-right: 12px; }
    </style>
</head>
<body>
<div class="container">
    <header>
        <h1>ملخص ليلة الامتحان الشامل: علم الإدارة</h1>
        <p>المحاضرة الأولى — إعداد أكاديمي منسق ومُعزز بالرسومات البيانية</p>
        <span class="badge">جاهز للطباعة والتحميل PDF</span>
    </header>

    <div class="toc-box">
        <div class="toc-title">📌 فهرس المحتويات</div>
        <ul class="toc-list">
            <li><a href="#sec1">1. نظرة عامة ومفهوم الإدارة</a></li>
            <li><a href="#sec2">2. الوظائف الإدارية الأربع (مخطط)</a></li>
            <li><a href="#sec3">3. تصنيف العلوم (طبيعية vs اجتماعية)</a></li>
            <li><a href="#sec4">4. الرقابة الإدارية وآلية قياس الأداء</a></li>
        </ul>
    </div>

    <section id="sec1">
        <h2>1. نظرة عامة ومفهوم الإدارة الشامل</h2>
        <p>الإدارة هي علم وفن تسيير الأعمال، ولا تقتصر فقط على الشركات، بل هي عنصر محوري في <span class="highlight-text">كافة مناحي الحياة</span>.</p>
        <div class="callout callout-info">
            <strong>🎯 التعريف الأكاديمي المعتمد:</strong> مجموعة الوظائف الإدارية المترابطة (تخطيط، تنظيم، توجيه، رقابة) الموجهة نحو استغلال الموارد بأعلى كفاءة.
        </div>
    </section>

    <section id="sec2">
        <h2>2. الوظائف الإدارية الأربع (Management Functions)</h2>
        <p>غياب أي وظيفة يؤدي إلى <span class="highlight-text" style="background-color: #fecaca;">انعدام الإدارة تماماً</span> وليس مجرد "إدارة ضعيفة".</p>
        <div class="diagram-container">
            <div class="workflow">
                <div class="wf-card"><h4>1. التخطيط</h4><p>وضع الأهداف</p></div>
                <div class="wf-arrow">➔</div>
                <div class="wf-card" style="background-color: var(--secondary);"><h4>2. التنظيم</h4><p>توزيع المهام</p></div>
                <div class="wf-arrow">➔</div>
                <div class="wf-card" style="background-color: var(--accent);"><h4>3. التوجيه</h4><p>القيادة والتحفيز</p></div>
                <div class="wf-arrow">➔</div>
                <div class="wf-card" style="background-color: #475569;"><h4>4. الرقابة</h4><p>تصحيح المسار</p></div>
            </div>
        </div>
    </section>

    <section id="sec3">
        <h2>3. تصنيف العلوم: موقع الإدارة</h2>
        <table>
            <thead>
                <tr>
                    <th>وجه المقارنة</th>
                    <th>العلوم الطبيعية</th>
                    <th>العلوم الاجتماعية</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>مرونة القوانين</strong></td>
                    <td>ثابتة ومطلقة</td>
                    <td>مرنة وتتطور باستمرار</td>
                </tr>
                <tr>
                    <td><strong>أمثلة</strong></td>
                    <td>الكيمياء، الفيزياء</td>
                    <td><span class="highlight-text">الإدارة</span>، الاقتصاد</td>
                </tr>
            </tbody>
        </table>
    </section>

    <section id="sec4">
        <h2>4. الأخطاء والفخاخ الامتحانية (Exam Traps)</h2>
        <div class="callout callout-danger">
            <strong>⚠️ احذر الوقوع في هذه الأخطاء:</strong>
            <ol style="padding-right: 20px;">
                <li><strong>الخطأ:</strong> غياب الرقابة يسبب "ضعف الإدارة". <br>➔ <strong>الصواب:</strong> يعني <u>انعدام الإدارة</u>.</li>
                <li><strong>الخطأ:</strong> تقديم التنظيم على التخطيط. <br>➔ <strong>الصواب:</strong> التخطيط دائماً هو الأول.</li>
            </ol>
        </div>
    </section>
</div>
</body>
</html>
`;

(async () => {
    try {
        console.log('⏳ جاري تشغيل المتصفح وتجهيز المحتوى...');
        
        // إطلاق المتصفح
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // حقن كود HTML والتنسيقات مباشرة في الصفحة (بدون قراءة ملفات خارجية)
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        console.log('🖨️ جاري استخراج ملف الـ PDF...');
        
        // توليد الـ PDF بالألوان الكاملة
        await page.pdf({
            path: 'Management_Guide_Pro.pdf',
            format: 'A4',
            printBackground: true, // ضروري لإظهار الألوان والتظليل
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });

        console.log('✅ تم بنجاح! تفقد ملف Management_Guide_Pro.pdf في مجلدك.');
        await browser.close();
    } catch (error) {
        console.error('❌ حدث خطأ:', error);
    }
})();