// Functions



function getLeafTree(showCat,leaf={}){
  Object.keys(showCat).forEach(function(catID){
    if (showCat[catID]===parseInt(showCat[catID], 10)){
      leaf[catID]=showCat[catID];
    }
    else {
      getLeafTree(showCat[catID], leaf);
    }
  });
  return leaf;
}

function getLeafCat(catID,showCat,showLeafCat,res={}){
    Object.keys(showCat).forEach(function(curID){
      if(curID==catID){
        Object.keys(getLeafTree(showCat[curID])).forEach(function(cid){
          res[cid]=showCat[curID][cid];
        });
      }
      else if (Object.keys(showLeafCat).includes(curID)) {}
      else {
        getLeafCat(catID,showCat[curID],showLeafCat,res)
      }
    });
    return res;
}

function updateMarkersToMap(showLeafCat,listEquipByLeafCat){
  Object.keys(showLeafCat).forEach(function(catID){
    if (showLeafCat[catID] === 1) {
      listEquipByLeafCat[catID].forEach(function(markerID){
         markers[markerID].addTo(map)
      })
    }
    else if (showLeafCat[catID] === 0){
      listEquipByLeafCat[catID].forEach(function(markerID){
         markers[markerID].remove(map)
      })
    }
    else{}

  })
}


function updateMarkersTree(showLeafCat){
  Object.keys(showLeafCat).forEach(function(catID){
    if (showLeafCat[catID] === 1) {
      $("#treeview").hummingbird("checkNode",{
        attr:"id",
        name: catID,
        expandParents:false,
      });
    }
    else{
      listEquipByLeafCat[catID].forEach(function(markerID){
         markers[markerID].remove(map)
      })
    }
  })
}

function createShowCat(l_box,l_equip,res={},idtmp="all"){
  const l_box_tmp =  $.extend( true,[] ,l_box );
  const unique = new Set(Object.keys(l_equip).map(id=>l_equip[id][l_box_tmp[0]]));

  if (l_box_tmp.length==1){unique.forEach(function(name){res[idtmp+":::"+name]=1})}
  else{
    const lbox0=l_box_tmp[0]
    l_box_tmp.shift()
    unique.forEach(function(name){
    const filtered = Object.keys(l_equip).filter(key => l_equip[key][lbox0]==name)
                      .reduce((obj, key) => {obj[key] = l_equip[key];return obj;}, {});
    res[idtmp+":::"+name]=createShowCat(l_box_tmp,filtered,{},idtmp+":::"+name)
    })
  }
  return res;
}




function createEquipByLeafCat(l_box,l_equip,res={},idtmp="all"){
  const l_box_tmp =  $.extend( true,[] ,l_box );
  const unique = new Set(Object.keys(l_equip).map(id=>l_equip[id][l_box_tmp[0]]));
  if (l_box_tmp.length==1){
     unique.forEach(function(name){
     res[idtmp+":::"+name]=Object.keys(l_equip).filter(id => l_equip[id][l_box_tmp[0]]==name)
   })
  }
  else{
    const lbox0=l_box_tmp[0]
    l_box_tmp.shift()
    unique.forEach(function(name){

      const filtered = Object.keys(l_equip).filter(key => l_equip[key][lbox0]==name)
                      .reduce((obj, key) => {obj[key] = l_equip[key];return obj; }, {});

    res=createEquipByLeafCat(l_box_tmp,filtered,res,idtmp+":::"+name)
    })
  }
  return res;
}







//Functions treeview

// $("#treeview").on("nodeChecked", function(){
//
//   const catChecked = [];
//   $("#treeview").hummingbird("getChecked",{
//     attr:"id",
//     list: catChecked,
//     onlyEndNodes:false
//   });
//
//   catChecked.forEach(function(catID){
//     if (Object.keys(showLeafCat).includes(catID)){
//       showLeafCat[catID]=1;
//     }
//     else{
//       const leafcat = getLeafCat(catID,showCat,showLeafCat);
//       Object.keys(leafcat).forEach(function(catID){
//         showLeafCat[catID]=1;
//       })
//     }
//   })
//
//   updateMarkersToMap(showLeafCat,listEquipByLeafCat)
// });



$("#treeview").on("CheckUncheckDone", function(){
  const catChecked = [];
  $("#treeview").hummingbird("getChecked",{
    attr:"id",
    list: catChecked,
    onlyEndNodes:true
  });

  catChecked.forEach(function(catID){
    if (Object.keys(showLeafCat).includes(catID)){
      showLeafCat[catID]=1;
    }
    else{
      const leafcat = getLeafCat(catID,showCat,showLeafCat);
      Object.keys(leafcat).forEach(function(catID){
        showLeafCat[catID]=1;
      })
    }
  })

  updateMarkersToMap(showLeafCat,listEquipByLeafCat)


  const catUnchecked =[];
  $("input:checkbox.hummingbird-end-node:not(:checked)").each(function() {
		catUnchecked.push($(this).attr("id"))});

  catUnchecked.forEach(function(catID){
    if (Object.keys(showLeafCat).includes(catID)){
      showLeafCat[catID]=0;
    }
    else{
      const leafcat = getLeafCat(catID,showCat,showLeafCat);
      Object.keys(leafcat).forEach(function(catID){
        showLeafCat[catID]=0;
      })
    }
  })

  updateMarkersToMap(showLeafCat,listEquipByLeafCat)
});










// Link treeview and markers
// Create showCat, showLeafCat, listEquipByLeafCat---
const showCat={"all":createShowCat(l_box,equipments,res={},idtmp="all")};
const showLeafCat=getLeafTree(showCat);
const listEquipByLeafCat = createEquipByLeafCat(l_box,equipments,{},idtmp="all");

// Treeview on map
$("#treeview").hummingbird();
$("#treeview").hummingbird("checkAll");
