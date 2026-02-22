let interviewJobsList = [];
let rejectJobsList = [];
let currentStatus='all'
let allCardData=[];
console.log(allCardData);


const DeleteBtn=document.querySelectorAll('.deleteBtn');
const allJobSection = document.getElementById('allJobs');

let totalCount = document.getElementById('total');
let interviewCount = document.getElementById('interview');
let rejectCount = document.getElementById('reject');


const allJobsCount = document.getElementById('allJobs');
const jobsLeft = document.getElementById('jobsLeft');


function calculateCount() {
    // total jobs count
    totalCount.innerText = allJobsCount.children.length;
    // interview Jobs count
    interviewCount.innerText = interviewJobsList.length;
    
    // rejected jobs count
    rejectCount.innerText = rejectJobsList.length;
    jobsLeft.innerText = allJobsCount.children.length;
}

calculateCount();

// get the main container 
const mainContainer = document.querySelector('main');

// get the navigation buttons
const allJobBtn = document.getElementById('btn-all');
const interviewJobsBtn = document.getElementById('btn-interview');
const rejectedBtn = document.getElementById('btn-rejected');

const filterJobs = document.getElementById('filterJobs');


function toggleBtns(id) {
    currentStatus=id;
    
    allJobBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewJobsBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    const selected = document.getElementById(id);
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    if (id == 'btn-interview') {
        const allJobSection = document.getElementById('allJobCard');
        allJobSection.classList.add('hidden');
        const interviewedJobs = document.getElementById('filterJobs');
        interviewedJobs.classList.remove('hidden')
        interviewJobs();
    }
    else if (id == 'btn-all') {
        const allJobSection = document.getElementById('allJobCard');
        allJobSection.classList.remove('hidden');
        const interviewedJobs = document.getElementById('filterJobs');
        interviewedJobs.classList.add('hidden')

    }
    else if (id == 'btn-rejected') {
        const allJobSection = document.getElementById('allJobCard');
        allJobSection.classList.add('hidden');
        const interviewedJobs = document.getElementById('filterJobs');
        interviewedJobs.classList.remove('hidden')
        rejectRender();
    }

}

mainContainer.addEventListener('click', function (e) {

    if (e.target.classList.contains('btnInterView')) {
        const parentNode = e.target.parentNode.parentNode.parentNode;
        const jobTitle = parentNode.querySelector('.job_Title').innerText;
        const jobPosition = parentNode.querySelector('.jobPosition').innerText;
        const jobType = parentNode.querySelector('.jobType').innerText;
        const status = parentNode.querySelector('.applicationStatus').innerText;

        const requirments = parentNode.querySelector('.requirments').innerText;

        const jobCardInfo = {
            jobTitle,
            jobPosition,
            jobType,
            status: 'Interviewed',
            requirments
        }

        console.log(jobCardInfo);
        const alreadyExist = interviewJobsList.find(items => items.jobTitle == jobCardInfo.jobTitle);

        
        
        parentNode.querySelector('.applicationStatus').innerText = 'Interviewed'
        parentNode.querySelector('.applicationStatus').classList.add('bg-green-300')
        parentNode.querySelector('.applicationStatus').classList.remove('bg-red-300')
        
        if (!alreadyExist) {
            interviewJobsList.push(jobCardInfo);
            console.log(interviewJobsList.length);
            
        }
        
        
        rejectJobsList = rejectJobsList.filter(item => item.jobTitle != jobCardInfo.jobTitle);
        if(currentStatus == 'btn-rejected'){
            rejectRender();
        }
        calculateCount();

         jobsLeft.innerText=`${interviewCount.innerText} of ${totalCount.innerText}` ;
        
    }

    else if (e.target.classList.contains('btnReject')) {
        const parentNode = e.target.parentNode.parentNode.parentNode;
        const jobTitle = parentNode.querySelector('.job_Title').innerText;
        const jobPosition = parentNode.querySelector('.jobPosition').innerText;
        const jobType = parentNode.querySelector('.jobType').innerText;
        const status = parentNode.querySelector('.applicationStatus').innerText;

        const requirments = parentNode.querySelector('.requirments').innerText;

        const jobCardInfo = {
            jobTitle,
            jobPosition,
            jobType,
            status: 'Rejected',
            requirments
        }

        console.log(jobCardInfo);
        const alreadyExist = rejectJobsList.find(items => items.jobTitle == jobCardInfo.jobTitle);

        if (!alreadyExist) {
            rejectJobsList.push(jobCardInfo);
        }
        
        
        parentNode.querySelector('.applicationStatus').innerText = 'Rejected'
        parentNode.querySelector('.applicationStatus').classList.add('bg-red-300')

        interviewJobsList=interviewJobsList.filter(item=> item.jobTitle != jobCardInfo.jobTitle);
        if(currentStatus=="btn-interview"){
            interviewJobs();
        }
        calculateCount();
        jobsLeft.innerText=`${interviewCount.innerText} of ${totalCount.innerText}` ;
    }

    // delegating for delete
    else if(e.target.closest('.deleteBtn')){
        console.log("clicked");
        const parentDiv=e.target.parentNode.parentNode.parentNode;
        const jobTitle = parentDiv.querySelector('.job_Title').innerText;

        interviewJobsList=interviewJobsList.filter(item=> item.jobTitle != jobTitle);
        rejectJobsList   = rejectJobsList.filter(j => j.jobTitle != jobTitle);
        console.log(parentDiv);
        allJobSection.removeChild(parentDiv);
        calculateCount()
        
        
    }




})

function rejectRender() {
    const rejectLength=rejectCount.innerText;

    filterJobs.innerHTML = ""
   if(rejectLength > 0){
     for (list of rejectJobsList) {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
              <h1 class="text-lg font-semibold job_Title">${list.jobTitle}</h1>
              <p class="text-gray-500 jobPosition">${list.jobPosition}</p>
            </div>

            <!-- trash icon -->
            <div class="border-2 rounded-full border-gray-400 p-2 cursor-pointer">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
          <p class="text-sm text-gray-500 jobType">${list.jobType}</p>
          <div>
            <h3 class="text-lg font-medium px-3 py-1 bg-[#EEF4FF] max-w-32 rounded-lg applicationStatus">${list.status}</h3>
            <p class="text-sm text-[#323B49] mt-2 requirments">${list.requirments}</p>
            <div class="mt-5">
              <button class="btnInterView btn border-green-500 text-green-500">interview</button>
              <button class="btnReject btn text-red-500 border-red-500">Rejected</button>
            </div>
          </div>
        `
        div.classList.add('space-y-5', 'mt-4', 'shadow', 'p-6', 'rounded-lg', 'bg-white')
        filterJobs.appendChild(div);
    }
   }
   else{
     let div = document.createElement('div');
        div.innerHTML=`
         <div class="space-y-2 mt-4 shadow p-6 rounded-lg bg-white flex flex-col justify-center items-center">
          <img src="./img/jobs.png" alt="">
           <h1 class="text-2xl font-semibold">No jobs available</h1>
           <h4 class="text-[#64748B]">Check back soon for new job opportunities</h4>
        </div>
        `
        filterJobs.appendChild(div);
   }
}
function interviewJobs() {
    const JobsLength=interviewCount.innerText;
   
    filterJobs.innerHTML = ""
    if(JobsLength > 0){
        for (list of interviewJobsList) {
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
              <h1 class="text-lg font-semibold job_Title">${list.jobTitle}</h1>
              <p class="text-gray-500 jobPosition">${list.jobPosition}</p>
            </div>

            <!-- trash icon -->
            <div class="border-2 rounded-full border-gray-400 p-2 cursor-pointer">
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
          <p class="text-sm text-gray-500 jobType">${list.jobType}</p>
          <div>
            <h3 class="text-lg font-medium px-3 py-1 bg-[#EEF4FF] max-w-32 rounded-lg applicationStatus">${list.status}</h3>
            <p class="text-sm text-[#323B49] mt-2 requirments">${list.requirments}</p>
            <div class="mt-5">
              <button class="btnInterView btn border-green-500 text-green-500">interview</button>
              <button class="btnReject btn text-red-500 border-red-500">Rejected</button>
            </div>
          </div>
        `
        div.classList.add('space-y-5', 'mt-4', 'shadow', 'p-6', 'rounded-lg', 'bg-white')
        filterJobs.appendChild(div);
    }
    }
    else{
        let div = document.createElement('div');
        div.innerHTML=`
         <div class="space-y-2 mt-4 shadow p-6 rounded-lg bg-white flex flex-col justify-center items-center">
          <img src="./img/jobs.png" alt="">
           <h1 class="text-2xl font-semibold">No jobs available</h1>
           <h4 class="text-[#64748B]">Check back soon for new job opportunities</h4>
        </div>
        `
        filterJobs.appendChild(div);
    }
}

calculateCount()
console.log(interviewJobsList.length);
